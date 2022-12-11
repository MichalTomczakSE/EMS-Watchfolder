const {watch} = require("chokidar");
const {basename, extname} = require('path');
const {colors} = require('../utils/colors');
const {createVideo} = require("../utils/createVideo");
const {green, yellow, red, white} = colors;


const videoTranscoder = (sequenceFolder, transcodingFolder, destinationFolder) => {

    watch(`${transcodingFolder}`, {
        usePolling: true,
        awaitWriteFinish: true,
        ignoreInitial: true,
    }).on('add', async (path) => {
        await createVideo(sequenceFolder, `${transcodingFolder}/${basename(path)}`, destinationFolder, basename(path, extname(path)))
    })
        .on('error', error => console.log(`${red}Error:`, error))
        .on('unlink', (path) => console.log(`${yellow}File ${basename(path)} has been deleted.${white}`))
        .on('ready', () => console.log(`${green}Initial scan complete. Ready for changes`));
}

module.exports = {
    videoTranscoder,
}