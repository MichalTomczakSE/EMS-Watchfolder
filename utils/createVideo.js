const { spawn } = require('child_process');
const {ffmpegOutputHelper} = require("./errorHandler");
const createVideo = (sequenceFolder,background, destination, fileName) => {

    const ffmpeg = spawn('ffmpeg', [

        '-i', sequenceFolder,
        '-i', background, '-s', '1920x1080',
        '-filter_complex', '[1:v][0:v]overlay=0:0[out]',
        '-map', '[out]',
        '-c:v', 'libx264',
        '-b:v', '5M',
        `${destination}/${fileName.slice(0,10)}.mp4`
    ]);

    ffmpegOutputHelper(ffmpeg,background);
}

module.exports = {
    createVideo,
}