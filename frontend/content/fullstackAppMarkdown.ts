export const fullstackAppMarkdown = `The Are You AI? app is powered entirely by the Cloudflare Developer Platform. Learn about all the different Cloudflare services that make this app possible.

**Pages**: The Next.js app that powers the Are You AI? website is hosted on Cloudflare Pages.  
**Workers**: The API is built on top of Cloudflare Workers to have a global Serverless API. Cloudflare's in house Observability tool is enabled as well to monitor the API.  
**Workers AI**: The app makes use of Workers AI to generate images, describe images, and create text-embeddings based on how you and the AI describe the image.  
**Vectorize**: Cloudflare's Vector database is use to store the text-embeddings and determine the similarity score. Metadata is stored in the Vector database and used to make sure comparisons are are made between the correct embeddings.  
**AI Gateway**: AI Gateway is used to observe the AI services and gives insights into how results are generated and cached.  
**Images**: All images generated by Workers AI are stored and optimized in Cloudflare's Image service.  
**D1**: The D1 database is used to store data about completed sessions.  
**KV**: Workers KV is used to store pre-generated AI images and to store the AI image descriptions.

`
