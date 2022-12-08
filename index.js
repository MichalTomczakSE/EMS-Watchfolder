const {watch} = require('chokidar');
const {copyFile, readFile, writeFile, unlink} = require('fs').promises;
const {basename,extname} = require('path');
const watchFolder = process.argv[2];
const {colors} = require('./utils/colors');
const {green,yellow,red,reset} = colors;
const {acceptableFileExtensions: extensions} = require('./data/extensions');

watch(`${watchFolder}`, {
    usePooling: true,
    awaitWriteFinish: true,
    ignoreInitial: true,
})
    .on('add', () => {
        console.log(`${reset} file has been added to watch-folder!`)
    })
    .on('error', error => console.log(`${red} Error:`, error))
    .on('ready', () => console.log(`${green}Initial scan complete. Ready for changes`));