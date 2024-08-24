
import { Hono } from "hono"
import ui from "ui.html";
import write from "write.html";
import { getAiImageDescription } from "./utils";

const app = new Hono()

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

app.get("/guess", async (c: any) => {

	const guess = c.req.query("text") || "A field of tall grass with bunnies dancing around";

	const aiDescription = await getAiImageDescription(c)
	return c.text(aiDescription)

	console.log(guess);
	const embeddings = await c.env.AI.run('@cf/baai/bge-base-en-v1.5', { text: guess })
	const vectors = embeddings.data[0]

	const vectorQuery = await c.env.VECTORIZE.query(vectors, { topK: 1 });
	console.log(vectorQuery.matches[0].score)
	return c.text(vectorQuery.matches[0].score);

	// const vecId = vectorQuery.matches[0]?.vectorId

	let notes = []
	if (vecId) {
	  const query = `SELECT * FROM notes WHERE id = ?`
	  const { results } = await c.env.DATABASE.prepare(query).bind(vecId).all()
	  if (results) notes = results.map((vec: { text: string; }) => vec.text)
	}



	const {response: answer } = await c.env.AI.run(
		"@cf/meta/llama-2-7b-chat-int8",
	{
		messages: [
			{role:"system", content: "You are a helpful assistant"},
			{role: "user", content: guess}
		]
	})

	return c.text(answer)
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

	const { data } = await c.env.AI.run("@cf/baai/bge-base-en-v1.5", {
	  text: [text],
	});
	const values = data[0];

	if (!values) {
	  return c.text("Failed to generate vector embedding", 500);
	}

	console.log(values);

	const { id } = record;
	const inserted = await c.env.VECTORIZE.upsert([
	  {
		id: id.toString(),
		values,
	  },
	]);

	return c.json({ id, text, inserted });
  });


export default app
