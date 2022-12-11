const {watch} = require("chokidar");
const {readFile, writeFile, unlink} = require('fs').promises;
const {basename, extname} = require('path');
const {acceptableFileExtensions: extensions} = require("../data/extensions");
const {colors} = require('../utils/colors');
const {scaleImage} = require("../utils/scaleImage");

const {green, yellow, red, white} = colors;

const ingestFolder = (watchFolder, transcodingFolder) => {

    watch(`${watchFolder}`, {
        usePolling: true,
        awaitWriteFinish: true,
        ignoreInitial: true,
    })
        .on('add', async path => {
            const fileName = String(basename(path));
            const fileExt = String(extname(path));
            const filePath = `${watchFolder}/${fileName}`;
            console.log(`${white}File ${fileName} has been added to ${watchFolder}`)
            try {
                if (!extensions.includes(fileExt)) {
                    await unlink(filePath)
                    return console.log(`${red}Wrong file format, program is aborted`);
                }
                const data = JSON.parse(await readFile('./data/data.json', {
                    encoding: 'utf8',
                }));
                data.files.push(
                    {
                        'name': `${fileName}`,
                        'id': `${data.files.length}`
                    });
                data.id = data.files.length;

                await writeFile('./data/data.json', JSON.stringify(data));
                console.log('File has been successfully saved in database, and moved to transcoder!');
                scaleImage(filePath,transcodingFolder, fileName);

            } catch (error) {
                if (error) {
                    console.log(`${red} ${error}`)
                }
            }
        })
        .on('error', error => console.log(`${red}Error:`, error, white))
        .on('unlink', (path) => console.log(`${yellow}File ${basename(path)} has been deleted.${white}`))
        .on('ready', () => console.log(`${green}Initial scan complete. Ready for changes${white}`));
}

module.exports = {
    ingestFolder,
}
