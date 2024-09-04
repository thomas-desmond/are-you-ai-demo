async function getAiImageDescription(c: any): Promise<string> {
	try {
		const res = await fetch('https://imagedelivery.net/llMDWXFPgX44M9elMfQ9XA/1761b7e9-42ba-4081-ab48-06796d20b500/public');
		const blob = await res.arrayBuffer();
		const input = {
			image: [...new Uint8Array(blob)],
			prompt: 'Describe the image in a concise sentence',
			max_tokens: 512,
		};
		const response = await c.env.AI.run('@cf/llava-hf/llava-1.5-7b-hf', input, {
			gateway: {
				id: 'are-you-ai-gateway',
				skipCache: false,
				cacheTtl: 3360,
			},
		});

		return response.description;
	} catch (error) {
		return 'Error';
	}
}

async function getAiImageDescriptionNew(c: any, encodedImage: any): Promise<string> {
	try {
		const input = {
			image: encodedImage,
			prompt: 'Describe the image in a concise sentence',
			max_tokens: 512,
		};
		const response = await c.env.AI.run('@cf/llava-hf/llava-1.5-7b-hf', input, {
			gateway: {
				id: 'are-you-ai-gateway',
				skipCache: false,
				cacheTtl: 3360,
			},
		});

		return response.description;
	} catch (error) {
		return 'Error';
	}
}

const generateVectorEmbedding = async (c: any, text: string) => {
	const { data } = await c.env.AI.run(
		'@cf/baai/bge-base-en-v1.5',
		{
			text: [text],
		},
		{
			gateway: {
				id: 'are-you-ai-gateway',
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

async function getWelcomeMessage(c: any): Promise<Response> {
	try {
		const messages = [
			{ role: "system", content: "Thomas is joining you and will be competing against AI to see how similarly they can describe an image to another AI model. You should simply welcome them to the challenge, i already have the images generated. Ask for a consise description of the image shown on the screen." },
			{
			  role: "user",
			  content: "Hi, I'm Thomas. I'm excited to see how well I can describe an image compared to an AI model. Let's get started!",
			},
		  ];
		  const response = await c.env.AI.run("@hf/thebloke/llama-2-13b-chat-awq", { messages });

		  return Response.json(response);
	} catch (error) {
		return new Response('Failed to get welcome message');
	}
}

export { getAiImageDescription, getAiImageDescriptionNew, generateVectorEmbedding, getWelcomeMessage };
