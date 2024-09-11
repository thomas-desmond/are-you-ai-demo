import { Hono } from 'hono';
import { generateVectorEmbedding, getAiImageDescription } from './utils';
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
	const encodedImage =  [...new Uint8Array(blob)]

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

	const vectorQuery = await c.env.VECTORIZE.query(userVectorValues, { topK: 1, filter: { sessionId: sessionId } });
	console.log('Location 3');

	console.log(vectorQuery);

	return c.json({
		similarityScore: vectorQuery.matches[0].score,
	});
});

export default app;
