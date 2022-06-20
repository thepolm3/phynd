import glob from 'glob'
import Jimp from 'jimp'
import path from 'path'
import fs from 'fs'


glob(`**/*.*`, { nocase: true, cwd: 'img' }, (er, files) => {
    if (er) {
        console.error(err)
    }
    files.forEach((filename, i) => {
        let filepath = path.parse(filename)
        let folder = filepath.name.split('.')[0]
        let full_name = `${folder}/${filepath.name}.jpg`
        if (!fs.existsSync(`static/img/full/${full_name}`)) {
            console.log(`Converting: ${filename} ${i}/${files.length}`)
            Jimp.read(`img/${filename}`, function (err, file) {
                if (err) {
                    console.error(err)
                } else {
                    
                        file.write(`static/img/full/${full_name}`)
                        file
                            .resize(Jimp.AUTO, 256)
                            .quality(60)
                            .write(`static/img/thumbs/${full_name}`)
                        console.log(`Finished ${filename} ${i}/${files.length}`)
                }
            })
        } else {
            console.log(`Skipped ${filename} ${i}/${files.length}`)
        }
    })
})

