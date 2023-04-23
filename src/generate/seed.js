import * as fs from 'fs';
import * as csv from 'fast-csv';
import { globSync } from 'glob';

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
];

async function seed() {
    console.info('Seeding plants.json...');
	let plants = [];
	let current_plant = { colloquial_name: '' };
	let plant_id = 0;
	let part_id = 0;
	let picture_id = 0;

	//load the csv
	fs.createReadStream('src/generate/plants.csv')
		.pipe(csv.parse({ headers: true }))
		.on('error', (error) => console.error(error))
		.on('data', (row) => {
			// the first column will be the name of the plant, but it may sometimes be blank.
			// in that case we should use the last seen value, here stored in "current_plant"
			if (row['Colloquial Name'] != '' && row['Colloquial Name'] != current_plant.colloquial_name) {
				// when moving from one name to another, we want to create the database entry for the
				// previous plant
				if (current_plant.colloquial_name != '') {
					plants.push(current_plant);
				}

				// now parse the plant information
				current_plant = {
					id: plant_id,
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
					thumbnail: null,
					parts: []
				};
				plant_id += 1;
			}

			//add all of this rows information to the plant part
			current_plant.parts.push({
				id: part_id,
				name: row['Plant Part'].trim(),
				collection: row['Collection Number'].trim(),

				//add all of the pictures of this part of the plant
				types: picture_types.flatMap((type) => {
					//the images are stored, comma seperated, in their own cell
					const images = row[type]
						.split(',')
						.map((x) => {
							return x.trim();
						})
						.filter((image_path) => {
							return image_path != '';
						});

					if (images.length === 0) {
						return [];
					}

					//now we need to get the image path
					return {
						name: type,
						pictures: images.flatMap((image_path) => {
							const folder = image_path.split('.')[0];

							// glob for anything matching the image name
							const files = globSync(
								`${folder}*/{${image_path} *,${image_path},${image_path}.*}`,
								{ nocase: true, cwd: 'static/img/thumbs' }
							);

							if (files.length == 0) {
								console.error(
									'Plant part picture not found!',
									image_path,
									current_plant.colloquial_name,
									row['Plant Part']
								);
							}

							return files.map((path) => {
								if (!current_plant.thumbnail) {
									current_plant.thumbnail = path;
								}
								picture_id += 1;
								return {
									id: picture_id,
									path
								};
							});
						})
					};
				})
			});
			part_id += 1;
		})
		.on('end', () => {
			fs.writeFile('src/plants.json', JSON.stringify(plants), (error) => {
				if (error) {console.error(error)};
			});
            console.info('Seeding plants.json finished');
		});
}

seed();
