import {glob} from 'glob';
import Jimp from 'jimp';
import path from 'path';
import fs from 'fs';

// arg 1 is min, arg 2 is max
const from = parseInt(process.argv[2]) || 0;
const to = parseInt(process.argv[3]) || Infinity;

const files = await glob(`**/*.*`, { nocase: true, cwd: 'img' });
console.log(files)
console.log("hi");
console.log(files);

files
    .filter((_, i) => {
        return i <= to && i >= from;
    })
    .forEach((filename, i) => {
        let filepath = path.parse(filename);
        let folder = filepath.name.split('.')[0];
        let full_name = `${folder}/${filepath.name}.jpg`;
        if (!fs.existsSync(`static/img/full/${full_name}`)) {
            console.log(`Converting: ${filename} ${i + from}/${files.length}`);
            Jimp.read(`img/${filename}`, function (err, file) {
                if (err) {
                    console.error(`Error on ${filename}${i + from}/${files.length}\n${err}`);
                } else {
                    file.write(`static/img/full/${full_name}`);
                    file.resize(Jimp.AUTO, 256).quality(60).write(`static/img/thumbs/${full_name}`);
                    console.log(`Finished ${filename} ${i + from}/${files.length}`);
                }
            });
        } else {
            console.log(`Skipped ${filename} ${i + from}/${files.length}`);
        }
    });
