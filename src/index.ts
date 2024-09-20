import { Hono } from 'hono';
import { generateVectorEmbedding, getAiImageDescription, getRandomImage } from './utils/aiUtils';
import { cors } from 'hono/cors';

const app = new Hono();

app.use(
	'*',
	cors({
		origin: '*',
		allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests', 'Content-Type'],
		allowMethods: ['POST', 'GET'],
		exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
		maxAge: 600,
		credentials: true,
	})
);

app.post('/aiImageDescription', async (c: any) => {
	const body = await c.req.json();
	const imageUrl = body.imageUrl;
	const sessionId = body.sessionId;

	const res = await fetch(imageUrl);
	const blob = await res.arrayBuffer();
	const encodedImage = [...new Uint8Array(blob)];

	const aiGeneratedDescription = await getAiImageDescription(c, encodedImage);
	const aiVectorValues = await generateVectorEmbedding(c, aiGeneratedDescription);

	await c.env.VECTORIZE.upsert([
		{
			id: sessionId,
			values: aiVectorValues,
			metadata: { sessionId: sessionId },
		},
	]);

	return c.json({ aiImageDescription: aiGeneratedDescription });
});

app.post('/getSimilarityScore', async (c: any) => {
	const body = await c.req.json();
	const sessionId = body.sessionId;
	const guess = body.text;

	console.log('Location 1');

	const userVectorValues = await generateVectorEmbedding(c, guess);
	console.log('Location 2');

	let vectorQuery = await c.env.VECTORIZE.query(userVectorValues, { topK: 1, filter: { sessionId: sessionId } });

	while (vectorQuery.count === 0) {
		await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
		vectorQuery = await c.env.VECTORIZE.query(userVectorValues, { topK: 1, filter: { sessionId: sessionId } });
	}
	console.log('Location 3');

	console.log(vectorQuery);

	return c.json({
		similarityScore: vectorQuery.matches[0].score,
	});
});

app.get('/randomImageUrl', async (c: any) => {
	console.log('Location 1');
	const data = await getRandomImage(c)

	if (data.success) {
		return c.json({
			imageUrl: data.result?.variants?.[0] ?? 'defaultImageUrl',
		});
	} else {
		return c.json({
			error: 'Image upload failed',
		});
	}
});

export default app;
