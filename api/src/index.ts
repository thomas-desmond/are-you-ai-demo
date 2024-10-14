import { Hono } from 'hono';
import { generateVectorEmbedding, getAiImageDescription, getRandomImage } from './utils/aiUtils';
import { cors } from 'hono/cors';

const app = new Hono();

app.use(
	'*',
	cors({
		origin: '*',
		allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests', 'Content-Type', `Session-Identifier`, 'API-Key' ],
		allowMethods: ['POST', 'GET'],
		exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
		maxAge: 600,
		credentials: true,
	})
);

app.post('/aiImageDescription', async (c: any) => {
	const apiKey = c.req.header('API-Key');
	if (!apiKey || apiKey !== c.env.API_KEY) {
		return c.json({ error: 'Invalid API-Key' }, 401);
	}

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
	const apiKey = c.req.header('API-Key');
	if (!apiKey || apiKey !== c.env.API_KEY) {
		return c.json({ error: 'Invalid API-Key' }, 401);
	}

	const body = await c.req.json();
	const sessionId = body.sessionId;
	const guess = body.text;

	const userVectorValues = await generateVectorEmbedding(c, guess);

	let vectorQuery = await c.env.VECTORIZE.query(userVectorValues, { topK: 1, filter: { sessionId: sessionId } });

	while (vectorQuery.count === 0) {
		await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
		vectorQuery = await c.env.VECTORIZE.query(userVectorValues, { topK: 1, filter: { sessionId: sessionId } });
	}

	return c.json({
		similarityScore: vectorQuery.matches[0].score,
	});
});

app.get('/randomImageUrl', async (c: any) => {
	const apiKey = c.req.header('API-Key');
	if (!apiKey || apiKey !== c.env.API_KEY) {
		return c.json({ error: 'Invalid API-Key' }, 401);
	}

	const data = await getRandomImage(c);

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

app.post('/databaseInsert', async (c: any) => {
	const apiKey = c.req.header('API-Key');
	if (!apiKey || apiKey !== c.env.API_KEY) {
		return c.json({ error: 'Invalid API-Key' }, 401);
	}

	const body = await c.req.json();
	const sessionId = body.sessionId;
	const userDescription = body.userDescription;
	const aiImageDescription = body.aiImageDescription;
	const score = body.score;
	const imageUrl = body.imageUrl;

	const username = null;
	const email = null;

	const response = await c.env.DB.prepare(
		'INSERT INTO Sessions (sessionID, username, email, date, score, aiImageDescription, userDescription, imageUrl) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8);'
	)
		.bind(sessionId, username, email, new Date().toISOString(), score, aiImageDescription, userDescription, imageUrl)
		.run();

	console.log(response);

	return c.json({
		success: true,
	});
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


export default app;
