import type { RequestHandler } from '@sveltejs/kit'

import { getPlantById } from '$root/utils/plants'

export const get: RequestHandler = async ({ params }) => {
	const plant = await getPlantById(Number.parseInt(params.id))

	if (!plant) {
		return { status: 400 }
	}

	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { plant }
	}
}
