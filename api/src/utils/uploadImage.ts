import { Context } from "hono";
import { nanoid } from "nanoid";

export async function uploadToCloudflareImages(c: Context, encodedImage: Uint8Array) {
	const imageName = nanoid();

	const apiUrl = c.env.IMAGE_API_URL;
	const token = c.env.IMAGE_UPLOAD_TOKEN;

	const formData = new FormData();
	formData.append('file', new File([encodedImage], `${imageName}.jpg`));
	formData.append('requireSignedURLs', 'false');

	const uploadResponse = await fetch(apiUrl, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
		},
		body: formData,
	});
	return uploadResponse;
}
