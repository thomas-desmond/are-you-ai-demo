import { Hono } from 'hono';
import { generateVectorEmbedding, getAiImageDescription, getAiImageDescriptionNew, getWelcomeMessage } from './utils';
import { cors } from 'hono/cors';

const app = new Hono();

app.use(
	'*',
	cors({
		origin: 'http://localhost:3000',
		allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests', 'Content-Type'],
		allowMethods: ['POST', 'GET'],
		exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
		maxAge: 600,
		credentials: true,
	})
);

app.post('/getAiImageDescription', async (c: any) => {
	const body = await c.req.json();
	console.log('body', body);
	const encodedImage = body.encodedImage;
	const aiGeneratedDescription = await getAiImageDescriptionNew(c, encodedImage);

	return c.json({ aiImageDescription: aiGeneratedDescription });
});

app.post('/guess', async (c: any) => {
	const body = await c.req.json();
	const sessionId = body.sessionId;
	const guess = body.text;

	const aiGeneratedDescription = await getAiImageDescription(c);
	console.log('Location 1');
	const aiVectorValues = await generateVectorEmbedding(c, aiGeneratedDescription);
	console.log('Location 2');

	await c.env.VECTORIZE.upsert([
		{
			id: sessionId,
			values: aiVectorValues,
			metadata: { sessionId: sessionId },
		},
	]);

	console.log('Location 3');

	const userVectorValues = await generateVectorEmbedding(c, guess);
	console.log('Location 4');

	await new Promise<void>((resolve) => {
		const waitTime = 5000; // 10 seconds
		const interval = 2000; // 2 seconds

		let counter = 0;
		const intervalId = setInterval(() => {
			console.log('Waiting...');
			counter += interval;

			if (counter >= waitTime) {
				clearInterval(intervalId);
				resolve();
			}
		}, interval);
	});

	const vectorQuery = await c.env.VECTORIZE.query(userVectorValues, { topK: 1, filter: { sessionId: sessionId } });
	console.log('Location 5');

	console.log(vectorQuery);

	return c.json({
		aiImageDescription: aiGeneratedDescription,
		similarityScore: vectorQuery.matches[0].score,
	});
});

export default app;
