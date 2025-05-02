import { Context } from "hono";

async function runImageSetup(c: Context): Promise<string> {
	for (const imageUrl of images) {
		await c.env.image_list.put(String(images.indexOf(imageUrl) + 1), imageUrl);

		const input = {
			image: Array.from(new Uint8Array(await (await fetch(imageUrl)).arrayBuffer())),
			prompt: 'Describe the image in a single detailed sentence',
			max_tokens: 512,
		};
		const response = await c.env.AI.run('@cf/llava-hf/llava-1.5-7b-hf', input, {
			gateway: {
				id: 'are-you-ai-demo',
				skipCache: false,
				cacheTtl: 3360,
			},
		});

		await c.env.ai_description.put(imageUrl, response.description);
	}

	return "Image Setup Complete";
}

async function runVectorizeSetup(c: Context): Promise<string> {
	for (const imageUrl of images) {
		const description = await c.env.ai_description.get(imageUrl);
		const { data } = await c.env.AI.run(
			'@cf/baai/bge-base-en-v1.5',
			{
				text: [description as string],
			},
			{
				gateway: {
					id: 'are-you-ai-demo',
					skipCache: false,
					cacheTtl: 3360,
				},
			}
		);
		const values = data[0];
		const match = imageUrl.match(/imagedelivery\.net\/[^/]+\/([^/]+)/);
		if (!match) throw new Error('Invalid image URL format');
		const imageId = match[1];

		await c.env.VECTORIZE.upsert([
			{
				id: imageId,
				values: values,
			},
		]);
	}

	return "Vectorize Setup Complete";
}

export { runImageSetup, runVectorizeSetup};


const images = [
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/0f34004f-a0cb-4a6b-e73b-11243de6a000/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/0f2a50d0-09a7-4e36-99f2-e7f24ca8cf00/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/49919273-f059-4a8a-5234-1103a4c58700/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/47516e7e-86c4-4280-818c-5666cd0fdb00/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/5607e2f1-adfb-4392-f882-2b697c644800/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/796f0460-acc2-4338-22f3-d5ca52f15400/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/4a024adb-2b5a-4931-e6df-0694304d4e00/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/4bdd52e8-cbc9-4c34-c80b-c64e8ccd1000/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/1b769b22-4f8d-418f-25ee-d25cc1f3f800/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/7998a350-fb83-42b5-37d4-9a3ecc148400/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/d2b2df42-ffee-4885-c5ce-386255da3800/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/a52a7354-03fa-4e0c-d942-dfec2455fc00/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/47515ccc-84a0-4628-daaa-bb856541a700/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/6fc81866-ab31-4646-1bfd-2138916c2300/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/4d5cfa3f-00ea-4922-c84a-cd7bf901c400/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/38fa1cf3-4679-4ad5-752a-2949a9819900/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/4788a519-b881-4db3-7e41-76be71cd0800/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/e00f0492-b200-4790-4c70-8ff4036e7500/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/54e5682f-d2f7-4a5d-ec59-032d7cc00100/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/3e7510c1-98de-4c5f-5b93-eb4224bf1000/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/34e6debf-f82d-47dc-aec7-b9bfbcca0a00/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/cdf185e4-b67a-4451-15ec-664e27541000/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/bf60b1dd-ba82-4ad5-301d-2cf59549be00/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/ea9bd864-4ab6-4d12-06c5-5a88d6522700/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/fa5da313-9d43-40ab-0128-b04557f6e700/Full",
  ]