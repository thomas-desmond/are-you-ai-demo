async function getAiImageDescription(c: any): Promise<string> {
	try {
		const res = await fetch("https://imagedelivery.net/llMDWXFPgX44M9elMfQ9XA/1761b7e9-42ba-4081-ab48-06796d20b500/public");
		const blob = await res.arrayBuffer();
		const input = {
			image: [...new Uint8Array(blob)],
			prompt: "Describe the image in a concise sentence",
			max_tokens: 512,
		};
		const response = await c.env.AI.run(
			"@cf/llava-hf/llava-1.5-7b-hf",
			input
		);

		return response.description;
	} catch (error) {
		return "Error";
	}
}

const generateVectorEmbedding = async (c: any, text: string) => {
	const { data } = await c.env.AI.run("@cf/baai/bge-base-en-v1.5", {
		text: [text],
	});
	const values = data[0];

	if (!values) {
		return c.text("Failed to generate vector embedding", 500);
	}

	return values;
};


export { getAiImageDescription,  generateVectorEmbedding }
