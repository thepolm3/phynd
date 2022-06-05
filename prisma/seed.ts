import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

import * as fs from 'fs'
import * as csv from 'fast-csv'
import glob from 'glob'

const picture_types = [
	'Overview Photo',
	'Multicell',
	'Bilobate',
	'Polylobate',
	'Rondel',
	'Crenate',
	'Trapezoid',
	'Cross',
	'Saddle',
	'Acute Bulbosus',
	'Blocky',
	'Bulliform Flabellate',
	'Elongate Entire',
	'Elongate Sinuate',
	'Elongate Dentate',
	'Elongate Dendritic',
	'Spheroid Psilate',
	'Spheroid Echinate',
	'Spheroid Ornate',
	'Papillate',
	'Tracheary',
	'Tracheary Pitted',
	'Tracheary Bordered',
	'Stomata',
	'Cork',
	'Silica Aggregate',
	'Sheet',
	'Bulliform Fusiform ',
	'Bulliform Crenate',
	'Blocky with Ridge',
	'Other'
]

async function seed() {
	let current_plant: any = { colloquial_name: '' }
	fs.createReadStream('./prisma/plants.csv')
		.pipe(csv.parse({ headers: true }))
		.on('error', (error) => console.error(error))
		.on('data', (row) => {
			if (row['Colloquial Name'] != '' && row['Colloquial Name'] != current_plant.colloquial_name) {
				if (current_plant.colloquial_name != '') {
					prisma.plant.create({ data: current_plant }).then(() => {
						console.log(`Seeded ${row['Colloquial Name']}`)
					})
				}
				current_plant = {
					colloquial_name: row['Colloquial Name'].trim(),
					family: row['Family'].trim(),
					genus: row['Genus'].trim(),
					species: row['Species'].trim(),
					plant_kingdom: row['Plant Kingdom'].trim(),
					descriptor: row['Descriptor'].trim(),
					project: row['Project'].trim(),
					author: row['Author'].trim(),
					kew_photo: row['Link to RBG Kew Photo'].trim(),
					project_herbarium_link: row['Project Herbarium Specimen'].trim(),
					thumbnail: '',
					parts: { create: [] }
				}
			}

			current_plant.parts.create.push({
				name: row['Plant Part'].trim(),
				collection: row['Collection Number'].trim(),
				pictures: {
					create: picture_types.flatMap((type) => {
						const images = row[type].split(',').map((x: string) => {
							return x.trim()
						})
						return images
							.filter((image_path: string) => {
								return image_path != ''
							})
							.flatMap((image_path: string) => {
								const folder = image_path.split('.')[0]
								const files = glob.sync(
									`${folder}*/{${image_path} *,${image_path},${image_path}.*}`,
									{ nocase: true, cwd: 'static/img/thumbs' }
								)

								if (files.length == 0) {
									console.log(image_path, current_plant.colloquial_name, row['Plant Part'])
								}
								return files.map((path: any) => {
									if (!current_plant.thumbnail) {
										current_plant.thumbnail = path
									}
									return {
										type: type,
										path: path
									}
								})
							})
					})
				}
			})
		})
		.on('end', () => {
			prisma.plant.create({ data: current_plant }).then(() => {
				console.log('Seeded final plant')
			})
		})
}

seed()
