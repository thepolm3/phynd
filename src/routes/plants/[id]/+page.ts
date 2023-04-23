import type { Plant } from '$root/types';


export async function load({ params }) {
	const id = Number.parseInt(params.id);
	const plants: Plant[] = (await import('$root/plants.json')).default;

	return { plant: plants[id] };
}
