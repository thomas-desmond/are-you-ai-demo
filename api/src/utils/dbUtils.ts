import { IsDescriptionAppropriate } from './aiUtils';

async function insertSessionToDB(c: any, score: number) {
	const body = await c.req.json();
	const sessionId = body.sessionId;
	const userDescription = body.text;
	const aiImageDescription = body.aiImageDescription;
	const imageUrl = body.imageUrl;

	const username = null;
	const email = null;

	const appropriate = await IsDescriptionAppropriate(c, userDescription);

	if (appropriate === 'true') {
		await c.env.DB.prepare(
			'INSERT INTO Sessions (sessionID, username, email, date, score, aiImageDescription, userDescription, imageUrl) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8);'
		)
			.bind(
				sessionId,
				username,
				email,
				new Date().toISOString(),
				parseFloat((score * 100).toFixed(3)),
				aiImageDescription,
				userDescription,
				imageUrl
			)
			.run();
	}
}

export { insertSessionToDB };
