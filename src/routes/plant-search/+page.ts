import type { PlantSearchResult } from '$root/types';

export async function load() {
	const data = await import('$root/plants.json');

	const plants: PlantSearchResult[] = data.default.map((plant) => {
		return {
			...plant,
			url: `/plants/${plant.id}`,
            thumbnail: plant.thumbnail || null,
			search_string: `${plant.colloquial_name} ${plant.genus} ${plant.species} ${plant.descriptor} ${plant.family}`
		};
	});

	return { plants };
}
