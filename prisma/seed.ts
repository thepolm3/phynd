import { PrismaClient } from '@prisma/client'
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
    //load the csv
	fs.createReadStream('./prisma/plants.csv')
		.pipe(csv.parse({ headers: true }))
		.on('error', (error) => console.error(error))
		.on('data', (row: any) => {
            // the first column will be the name of the plant, but it may sometimes be blank.
            // in that case we should use the last seen value, here stored in "current_plant"
			if (row['Colloquial Name'] != '' && row['Colloquial Name'] != current_plant.colloquial_name) {
                // when moving from one name to another, we want to create the database entry for the
                // previous plant
				if (current_plant.colloquial_name != '') {
					prisma.plant.create({ data: current_plant }).then(() => {
						console.log(`Seeded ${row['Colloquial Name']}`)
					})
				}

                // now parse the plant information
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

            //add all of this rows information to the plant part
			current_plant.parts.create.push({
				name: row['Plant Part'].trim(),
				collection: row['Collection Number'].trim(),

                //add all of the pictures of this part of the plant
				pictures: {
					create: picture_types.flatMap((type) => {

                        //the images are stored, comma seperated, in their own cell
						const images = row[type].split(',').map((x: string) => {
							return x.trim()
						})

                        //now we need to get the image path
						return images
							.filter((image_path: string) => {
								return image_path != ''
							})
							.flatMap((image_path: string) => {
								const folder = image_path.split('.')[0]

                                // glob for anything matching the image name
								const files = glob.sync(
									`${folder}*/{${image_path} *,${image_path},${image_path}.*}`,
									{ nocase: true, cwd: 'static/img/thumbs' }
								)

								if (files.length == 0) {
									console.log('Plant part picture not found!', image_path, current_plant.colloquial_name, row['Plant Part'])
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
