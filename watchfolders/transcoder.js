const {watch} = require("chokidar");
const {unlink} = require('fs').promises;
const {basename, extname} = require('path');
const ffmpeg = require('fluent-ffmpeg');

const {colors} = require('../utils/colors');
const {green, yellow, red, white} = colors;


const transcodingFolder = (transcodingFolder, destinationFolder) => {

    watch(`${transcodingFolder}`, {
        usePolling: true,
        awaitWriteFinish: true,
        ignoreInitial: true,
    }).on('add', async (path) => {




    })
        .on('error', error => console.log(`${red}Error:`, error))
        .on('unlink', (path) => console.log(`${yellow}File ${basename(path)} has been deleted.`))
        .on('ready', () => console.log(`${green}Initial scan complete. Ready for changes`));
}

module.exports = {
    transcodingFolder,
}