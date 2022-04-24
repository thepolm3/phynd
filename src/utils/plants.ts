import { prisma } from '$root/lib/prisma'
import type { PlantPartType, PlantPictureType, PlantType } from '$root/types'
import slug from 'limax'

export async function getPlants() {
	const plants = await prisma.plant.findMany({
		orderBy: { colloquial_name: 'asc' },
		include: {
			parts: {
				include: {
					pictures: true
				}
			}
		}
	})

	return plants.map((plant: PlantType) => {
		return {
			...plant,
			url: `/plants/${plant.id}`,
			search_string: `${plant.colloquial_name} ${plant.family} ${plant.genus} ${plant.species} ${plant.plant_kingdom} ${plant.descriptor}`
		}
	})
}

export async function getPictures() {
	const pictures = await prisma.plantPartPicture.findMany({
		include: {
			plant_part: {
				include: {
					plant: true
				}
			}
		}
	})

	return pictures.map((picture: PlantPictureType) => {
		const plant = picture.plant_part.plant
		const s = slug(`${picture.plant_part.name}-${picture.type}`)
		return {
			...picture,
			thumbnail: picture.path,
			url: `/plants/${plant.id}#${s}`,
			search_string: `${picture.type} ${plant.colloquial_name} ${picture.plant_part.name}`
		}
	})
}

export async function getPlantById(id: number) {
	const plant = await prisma.plant.findUnique({
		where: {
			id: id
		},
		include: {
			parts: {
				include: {
					pictures: true
				}
			}
		}
	})

	plant.parts.forEach((part: PlantPartType) => {
		const types: Map<string, PlantPictureType[]> = new Map()
		part.pictures.forEach((picture: PlantPictureType) => {
			const type = types.get(picture.type)
			if (!type) {
				types.set(picture.type, [picture])
			} else {
				type.push(picture)
			}
		})
		part.types = Array.from(types, ([name, value]: [string, PlantPictureType[]]) => [name, value])
	})
	return plant
}
