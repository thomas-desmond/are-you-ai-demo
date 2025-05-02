import { Hono } from 'hono';
import { generateVectorEmbedding, getAiImageDescription, getRandomImage, IsDescriptionAppropriate } from './utils/aiUtils';
import { cors } from 'hono/cors';
import { insertSessionToDB } from './utils/dbUtils';
import { runImageSetup, runVectorizeSetup } from './utils/setup';

const app = new Hono();

app.use(
	'*',
	cors({
		origin: '*',
		allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests', 'Content-Type', `Session-Identifier`, 'API-Key'],
		allowMethods: ['POST', 'GET'],
		exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
		maxAge: 600,
		credentials: true,
	})
);

app.post('/populateVectorize', async (c: any) => {
	const apiKey = c.req.header('API-Key');
	if (!apiKey || apiKey !== c.env.API_KEY) {
		return c.json({ error: 'Invalid API-Key' }, 401);
	}

	const body = await c.req.json();
	const imageUrl = body.imageUrl;

	const aiGeneratedDescription = await c.env.ai_description.get(imageUrl);
	const aiVectorValues = await generateVectorEmbedding(c, aiGeneratedDescription);

	const imageId = imageUrl.match(/imagedelivery\.net\/[^/]+\/([^/]+)/)[1];

	const response = await c.env.VECTORIZE.upsert([
		{
			id: imageId,
			values: aiVectorValues,
			metadata: { imageurl: imageId },
		},
	]);

	return c.json({ response: aiGeneratedDescription });
});

app.post('/aiImageDescription', async (c: any) => {
	const apiKey = c.req.header('API-Key');
	if (!apiKey || apiKey !== c.env.API_KEY) {
		return c.json({ error: 'Invalid API-Key' }, 401);
	}

	const body = await c.req.json();
	const imageUrl = body.imageUrl;

	const aiGeneratedDescription = await c.env.ai_description.get(imageUrl);
	return c.json({ aiImageDescription: aiGeneratedDescription });
});

app.post('/getSimilarityScore', async (c: any) => {
	const apiKey = c.req.header('API-Key');
	if (!apiKey || apiKey !== c.env.API_KEY) {
		return c.json({ error: 'Invalid API-Key' }, 401);
	}
	const body = await c.req.json();
	const imageUrl = body.imageUrl;

	const guess = body.text;

	const userVectorValues = await generateVectorEmbedding(c, guess);
	const imageId = imageUrl.match(/imagedelivery\.net\/[^/]+\/([^/]+)/)[1];

	let vectorQuery = await c.env.VECTORIZE.query(userVectorValues, { topK: 1 });

	if (vectorQuery.count === 0) {
		console.log('No matches found');
		return c.json({
			similarityScore: 0.01,
		});
	}

	c.executionCtx.waitUntil(insertSessionToDB(c, vectorQuery.matches[0].score));

	return c.json({
		similarityScore: vectorQuery.matches[0].score,
	});
});

app.get('/randomImageUrl', async (c: any) => {
	const apiKey = c.req.header('API-Key');
	if (!apiKey || apiKey !== c.env.API_KEY) {
		return c.json({ error: 'Invalid API-Key' }, 401);
	}

	const randomNumber = Math.floor(Math.random() * 25) + 1;
	const url = await c.env.image_list.get(randomNumber);

	if (url) {
		return c.json({
			imageUrl: url,
		});
	} else {
		return c.json({
			error: 'Image Fetch Failed',
		});
	}
});

app.get('/recentSessions', async (c: any) => {
	const apiKey = c.req.header('API-Key');
	if (!apiKey || apiKey !== c.env.API_KEY) {
		return c.json({ error: 'Invalid API-Key' }, 401);
	}

	const response = await c.env.DB.prepare('SELECT * FROM Sessions ORDER BY date DESC LIMIT 10;').all();

	return c.json({
		sessions: response,
	});
});

app.get('/setupImages', async (c: any) => {
	const response = await runImageSetup(c);

	return c.json({
		response: response,
	});
});

app.get('/setupVectorize', async (c: any) => {
	const response = await runVectorizeSetup(c);

	return c.json({
		response: response,
	});
});

export default app;
