import type { RequestHandler } from '@sveltejs/kit'
import { getPictures } from '$root/utils/plants'

export const get: RequestHandler = async () => {
	const pictures = await getPictures()

	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { pictures }
	}
}
