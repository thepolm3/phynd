import type { PlantPictureSearchResult } from '$root/types';

export async function load() {
	const plants = await import('$root/plants.json');
	const pictures: PlantPictureSearchResult[] = plants.default.flatMap((plant) =>
		plant.parts.flatMap((part) =>
			part.types.flatMap((type) =>
				type.pictures.map((picture) => {
					return {
						...picture,
						type: type.name,
						thumbnail: picture.path || null,
						url: `/plants/${plant.id}#${part.name}-${type.name}`,
						search_string: `${type.name} ${plant.colloquial_name} ${part.name}`,
						plant_name: plant.colloquial_name,
						part_name: part.name,
						plant_genus: plant.genus,
						plant_species: plant.species
					};
				})
			)
		)
	);
    
    const unique_paths = new Set();
    const unique = pictures.filter((picture) => {
        if (unique_paths.has(picture.path)) {
            return false
        } else {
            unique_paths.add(picture.path); return true
        }
    })

	return { pictures: unique };
}
