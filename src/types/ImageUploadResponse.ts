export interface ImageUploadResponse {
	result: Result;
	success: boolean;
	errors?: null[] | null;
	messages?: null[] | null;
}
interface Result {
	id: string;
	filename: string;
	uploaded: string;
	requireSignedURLs: boolean;
	variants?: string[] | null;
}
