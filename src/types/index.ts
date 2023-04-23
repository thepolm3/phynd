export type Plant = {
	id: number;
	colloquial_name: string;
	family: string;
	genus: string;
	species: string;
	plant_kingdom: string;
	descriptor: string;
	project: string;
	author: string;
	kew_photo: string;
	project_herbarium_link: string;
	thumbnail: string | null;
	parts: PlantPart[];
};

export type PlantPart = {
	id: number;
	name: string;
	collection: string;
	types: PictureType[];
};

export type PictureType = {
	name: string;
	pictures: Picture[];
};

export type Picture = {
	id: number;
	path: string;
};

export type PlantPartSearchResult = {
	id: number;
	collection: string;
	name: string;
	kew_photo: string;
	project_herbarium_link: string;
	other: string;
	plant: Plant;
	pictures: Picture[];
};

export type PlantSearchResult = Plant & {
	search_string: string;
	url: string;
};

export type PlantPictureSearchResult = Picture & {
	url: string;
	type: string;
	thumbnail: string | null;
	plant_name: string;
	plant_species: string;
	plant_genus: string;
	part_name: string;
};
