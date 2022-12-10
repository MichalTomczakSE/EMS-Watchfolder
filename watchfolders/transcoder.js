const {watch} = require("chokidar");
const {unlink} = require('fs').promises;
const {basename, extname} = require('path');
const {colors} = require('../utils/colors');
const {createVideo} = require("../utils/createVideo");
const {green, yellow, red, white} = colors;


const videoTranscoder = (transcodingFolder, destinationFolder) => {

    watch(`${transcodingFolder}`, {
        usePolling: true,
        awaitWriteFinish: true,
        ignoreInitial: true,
    }).on('add', async (path) => {
        console.log('basename in transcoder.js: ', transcodingFolder, basename(path))
        await createVideo(`${transcodingFolder}/${basename(path)}`,basename(path, extname(path)))
    })
        .on('error', error => console.log(`${red}Error:`, error))
        .on('unlink', (path) => console.log(`${yellow}File ${basename(path)} has been deleted.`))
        .on('ready', () => console.log(`${green}Initial scan complete. Ready for changes`));
}

module.exports = {
    videoTranscoder,
}