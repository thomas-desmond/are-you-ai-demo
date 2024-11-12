import { ImageUploadResponse } from '../types/ImageUploadResponse';
import { Context } from 'hono';
import { getRandomPrompt } from './getRandomPrompt';
import { uploadToCloudflareImages } from './uploadImage';

async function getAiImageDescription(c: Context, encodedImage: any): Promise<string> {
	try {
		const input = {
			image: encodedImage,
			prompt: 'Describe the image in a single detailed sentence',
			max_tokens: 512,
		};
		const response = await c.env.AI.run('@cf/llava-hf/llava-1.5-7b-hf', input, {
			gateway: {
				id: c.env.AI_GATEWAY_ID,
				skipCache: false,
				cacheTtl: 3360,
			},
		});

		return response.description;
	} catch (error) {
		return 'Error';
	}
}

const generateVectorEmbedding = async (c: Context, text: string) => {
	const { data } = await c.env.AI.run(
		'@cf/baai/bge-base-en-v1.5',
		{
			text: [text],
		},
		{
			gateway: {
				id: c.env.AI_GATEWAY_ID,
				skipCache: false,
				cacheTtl: 3360,
			},
		}
	);
	const values = data[0];

	if (!values) {
		return c.text('Failed to generate vector embedding', 500);
	}

	return values;
};

async function getRandomImage(c: any): Promise<ImageUploadResponse> {
	const inputs = {
		prompt: getRandomPrompt(),
	};

	const response = await c.env.AI.run('@cf/bytedance/stable-diffusion-xl-lightning', inputs, {
		gateway: {
			id: c.env.AI_GATEWAY_ID,
			skipCache: false,
			cacheTtl: 3360,
		},
	});

	let newResp = new Response(response);
	let encodedImage = await newResp.bytes();

	const uploadResponse = await uploadToCloudflareImages(c, encodedImage);

	const data = (await uploadResponse.json()) as ImageUploadResponse;
	return data;
}

async function IsDescriptionAppropriate(c: any, userDescription: string): Promise<string> {
	const messages = [
		{
			role: 'system',
			content:
				"You are an AI that evaluates whether a given text is appropriate. Consider 'appropriate' to mean the text is free from offensive, discriminatory, or explicit content, and maintains a respectful tone suitable for a general audience. Respond only with 'true' if the text is appropriate or 'false' if it is inappropriate. Do not provide explanations or any other text.",
		},
		{
			role: 'user',
			content: userDescription,
		},
	];
	const appropriate = await c.env.AI.run('@cf/meta/llama-3.1-8b-instruct-fast', { messages });
	return appropriate.response.toLowerCase();
}


export { getAiImageDescription, generateVectorEmbedding, getRandomImage, IsDescriptionAppropriate };
