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


export { getAiImageDescription, generateVectorEmbedding, getRandomImage };
