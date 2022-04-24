export type PlantType = {
	id: number
	family: string
	colloquial_name: string
	genus: string
	species: string
	plant_kingdom: string
	descriptor: string
	project: string
	author: string
	parts: PlantPartType[]
	thumbnail: string
	url: string
	search_string: string
}

export type PlantPartType = {
	id: number
	collection: string
	name: string
	kew_photo: string
	project_herbarium_link: string
	other: string
	plant: PlantType
	pictures: PlantPictureType[]
	types?: [string, PlantPictureType[]][]
}

export type PlantPictureType = {
	id: number
	path: string
	type: string
	plant_part: PlantPartType
	thumbnail: string
	url: string
	search_string: string
}
