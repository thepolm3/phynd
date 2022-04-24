import glob from 'glob'
import Jimp from 'jimp'
import path from 'path'
import fs from 'fs'


glob(`**/*.*`, { nocase: true, cwd: 'img' }, (er, files) => {
    files.forEach((filename) => {
        let filepath = path.parse(filename)
        let folder = filepath.name.split('.')[0]
        let full_name = `${folder}/${filepath.name}.jpg`
        if (!fs.existsSync(`static/img/full/${full_name}`)) {
            console.log(`Converting: ${filename}`)
            Jimp.read(`img/${filename}`, function (err, file) {
                if (err) {
                    console.log(err)
                } else {
                    
                        file.write(`static/img/full/${full_name}`)
                        file
                            .resize(Jimp.AUTO, 256)
                            .quality(60)
                            .write(`static/img/thumbs/${full_name}`)
                        console.log(`Finished ${filename}`)
                }
            })
        } else {
            console.log(`Skipped ${filename}`)
        }
    })
})

