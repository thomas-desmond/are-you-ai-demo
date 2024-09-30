export const onUserSubmissionMarkdown = `Learn what happens when the users image description is submitted:

1. The user description of the image is submitted to the API. Via AI Gateway, an AI Worker generates a text-embedding of the users' description.
2. A request is sent to Vectorize to compare the user's image description with the AI's image description already stored in the vector database. Metadata in the vector database is employed to refine the query, ensuring that the comparison is made only against the AI's image description for the same image.
3. The similarity score is sent back to the Next.js frontend application.
4. Store all relevant data from the completed session in a D1 database for use on the Recent Sessions page.
`
