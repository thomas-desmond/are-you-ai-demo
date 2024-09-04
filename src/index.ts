
import { Hono } from "hono"
import ui from "./ui.html";
import write from "./write.html";
import { generateVectorEmbedding, getAiImageDescription, getAiImageDescriptionNew, getWelcomeMessage } from "./utils";
import { cors } from 'hono/cors'

const app = new Hono()

app.use('*',   cors({
    origin: 'http://localhost:3000',
    allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests', 'Content-Type'],
    allowMethods: ['POST', 'GET'],
    exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    maxAge: 600,
    credentials: true,
  }))

app.get("/", (c: any) => {
	return c.html(ui);
})

app.get("/vectors", async (c: any) => {
	return c.json(await c.env.VECTORIZE.getByIds(["1","2","3","4","5"]));
})
// app.get('/notes', async (c) => {
// 	return c.html(notes);
// })

app.get('/write', async (c) => {
	return c.html(write);
})

app.get("/welcome", async (c: any) => {

	const message =  await getWelcomeMessage(c);
	return message	;
})

app.get("/guess", async (c: any) => {

	const guess = c.req.query("text") || "A field of tall grass with bunnies dancing around";

	const aiGeneratedDescription = await getAiImageDescription(c)
	console.log('Location 1')
	const aiVectorValues = await generateVectorEmbedding(c, aiGeneratedDescription);
	console.log('Location 2')

	const inserted = await c.env.VECTORIZE.upsert([
		{
			id: "1",
			values: aiVectorValues
		},
	]);
	console.log('Location 3')


	const userVectorValues = await generateVectorEmbedding(c, guess);
	console.log('Location 4')

	const vectorQuery = await c.env.VECTORIZE.query(userVectorValues, { topK: 1 });
	console.log('Location 5')

	console.log(vectorQuery);
	const similarityScore = vectorQuery.matches[0].score;

	return c.text(`The AI generated description is: ${aiGeneratedDescription} \n\n The similarity score between the AI generated description and your guess is: ${similarityScore}`);
})

app.post("/getAiImageDescription", async (c: any) => {
	const body = await c.req.json()
	console.log("body", body)
	const encodedImage = body.encodedImage;
	const aiGeneratedDescription = await getAiImageDescriptionNew(c, encodedImage)

	return c.json({aiImageDescription: aiGeneratedDescription});
})

app.post("/guess", async (c: any) => {
	const body = await c.req.json()
	console.log("body", body)
	const guess = body.text;
	console.log(guess)
	// const guess = c.req.query("text") || "A field of tall grass with bunnies dancing around";

	const aiGeneratedDescription = await getAiImageDescription(c)
	console.log('Location 1')
	const aiVectorValues = await generateVectorEmbedding(c, aiGeneratedDescription);
	console.log('Location 2')

	const inserted = await c.env.VECTORIZE.upsert([
		{
			id: "1",
			values: aiVectorValues
		},
	]);
	console.log('Location 3')


	const userVectorValues = await generateVectorEmbedding(c, guess);
	console.log('Location 4')

	const vectorQuery = await c.env.VECTORIZE.query(userVectorValues, { topK: 1 });
	console.log('Location 5')

	console.log(vectorQuery);
	const similarityScore = vectorQuery.matches[0].score;

	return c.json({message: `The AI generated description is: ${aiGeneratedDescription} \n\n The similarity score between the AI generated description and your guess is: ${similarityScore}`});
})


app.post("/notes", async (c) => {
	// const { text } = await c.req.json();
	const text = 'blue sky mountains';
	if (!text) {
	  return c.text("Missing text", 400);
	}

	const { results } = await c.env.DB.prepare(
	  "INSERT INTO AiImageDescription (description, url) VALUES ('blue sky mountains', 'www.picture.com') RETURNING *",
	)
	  .run();

	const record = results.length ? results[0] : null;

	if (!record) {
	  return c.text("Failed to create note", 500);
	}

	const { id } = record;
	const inserted = await generateVectorEmbedding(c, text);

	return c.json({ id, text, inserted });
  });


export default app


