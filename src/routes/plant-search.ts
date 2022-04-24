import type { RequestHandler } from '@sveltejs/kit'
import { getPlants } from '$root/utils/plants'

export const get: RequestHandler = async () => {
	const plants = await getPlants()

	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { plants }
	}
}
