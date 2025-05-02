import { WorkflowEntrypoint, WorkflowStep, WorkflowEvent } from 'cloudflare:workers';

type Env = {
	ARE_YOU_AI_WORKFLOW: Workflow;
	image_list: KVNamespace;
	ai_description: KVNamespace;
	AI: Ai;
	VECTORIZE: VectorizeIndex;
};

export class AreYouAiWorkflow extends WorkflowEntrypoint<Env, Params> {
	async run(event: WorkflowEvent<Params>, step: WorkflowStep) {

		await step.do('Insert image URLs into KV', async () => {
			for (const imageUrl of images) {
				await this.env.image_list.put(String(images.indexOf(imageUrl) + 1), imageUrl);
			}
		});

		await step.do('Get AI Image Description & Insert into KV', async () => {
			for (const imageUrl of images) {
				const input = {
					image: Array.from(new Uint8Array(await (await fetch(imageUrl)).arrayBuffer())),
					prompt: 'Describe the image in a single detailed sentence',
					max_tokens: 512,
				};
				const response = await this.env.AI.run('@cf/llava-hf/llava-1.5-7b-hf', input, {
					gateway: {
						id: 'are-you-ai-demo',
						skipCache: false,
						cacheTtl: 3360,
					},
				});

				await this.env.ai_description.put(imageUrl, response.description);
			}
		});

		await step.do('Generate & Insert Vector Embeddings', async () => {
			for (const imageUrl of images) {
				const description = await this.env.ai_description.get(imageUrl);
				const { data } = await this.env.AI.run(
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

				await this.env.VECTORIZE.upsert([
					{
						id: imageId,
						values: values,
					},
				]);
			}
		});
	}
}

export default {
	async fetch(req: Request, env: Env): Promise<Response> {
		let url = new URL(req.url);

		if (url.pathname.startsWith('/favicon')) {
			return Response.json({}, { status: 404 });
		}
		
		// Spawn a new instance and return the ID and status
		let instance = await env.ARE_YOU_AI_WORKFLOW.create();
		return Response.json({
			message: 'Are You AI Workflow Started, check on the status in the Workflows page in your dashboard, if it fails review error & refresh the page and try again. ',
			id: instance.id,
			details: await instance.status(),
		});
	},
};


const images = [
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/09451616-06d9-4e8e-3df4-93f923a3b300/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/0ff94cc6-d611-4a75-fac8-9ad0ded75600/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/7aac6f83-20d0-4cc9-a967-288ccd833b00/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/15b4a0b0-82c2-40c1-6253-7677503ed600/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/f06701f1-3ca5-48fa-cd37-d33d48e53b00/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/df14a6ac-734c-4457-8fb1-cd5ac8ddc700/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/4d416ada-469b-4788-2727-f851c2b77200/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/5d77f2dd-8b90-4d80-6ecb-a3957cbaa000/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/fb3e075d-bd8e-43dc-8cf5-196db6eaa900/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/59c39a2b-7999-4191-12a1-0501383edc00/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/b1831f75-8ca7-4a65-3035-96ccdeaa2700/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/20419e50-438a-43c9-caa0-93d5e911cd00/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/fe5bee9a-6167-453b-28ab-a7afd83f7e00/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/c49e6d20-2652-4a5c-2774-613dd24e7700/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/1f444466-4ea6-4043-03f6-9781ea3c5800/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/e699d910-9f54-45ea-b3f4-656ccf9f9700/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/f5eec02b-fb85-4068-a2eb-0ff769a87e00/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/d160e9c4-2171-47e3-ce1f-7373748f9800/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/0b4b03f0-473c-40d3-5b43-058238eddd00/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/549990bf-1ba1-48a8-7b62-f679d5e43200/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/084a8c79-f02f-446d-5749-589658f57500/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/883fbf81-3d75-4a15-d0fb-60d2e7db3000/Full",
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/136e0d5a-fd84-416f-60a5-5b9e69764900/Full",
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
	"https://imagedelivery.net/OlHC24dIBTr0q5xQPcgdJA/daa0f362-89ad-4127-4408-ed1aff1ec500/Full"
  ]