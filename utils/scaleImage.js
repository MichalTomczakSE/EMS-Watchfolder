const {spawn} = require('child_process');
const {ffmpegOutputHelper} = require("./errorHandler");
const {input, videoFilter,sampleAspectRatio} = require('../data/processes.json')
const scaleImage = (source, destination, fileName) => {

    const ffmpeg = spawn('ffmpeg', [
        input, `${source}`,
        videoFilter,sampleAspectRatio,
        `${destination}/${fileName}`
    ]);
    ffmpegOutputHelper(ffmpeg, source);
}

module.exports = {
    scaleImage,
}