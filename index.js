const {watch} = require('chokidar');
const {copyFile, readFile, writeFile, unlink} = require('fs').promises;
const {basename,extname} = require('path');
const watchFolder = process.argv[2];
const {colors} = require('./utils/colors');
const {green,yellow,red,white} = colors;
const {acceptableFileExtensions: extensions} = require('./data/extensions');

watch(`${watchFolder}`, {
    usePooling: true,
    awaitWriteFinish: true,
    ignoreInitial: true,
})
    .on('add', async path => {
        const fileName = basename(path);
        console.log(`${white}File ${fileName} has been added to ${watchFolder}`)
        try {
            if (!extensions.includes(extname(path))) {
                await unlink(`${watchFolder}/${String(fileName)}`)
                return console.log(`${red}Wrong file format, program is aborted`);
            }
         console.log(`${green}${fileName} has been loaded without error!`)

        } catch (error) {
            if (error) {
                console.log(`${red} ${error}`)
            }
        }
    })
    .on('error', error => console.log(`${red}Error:`, error))
    .on('unlink', (path) => console.log(`${yellow}File ${basename(path)} has been deleted.`))
    .on('ready', () => console.log(`${green}Initial scan complete. Ready for changes`));