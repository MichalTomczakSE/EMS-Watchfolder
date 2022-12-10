const {spawn} = require('child_process');
const {ffmpegOutputHelper} = require("./errorHandler");

const scaleImage = (source, destination, fileName) => {

    const ffmpeg = spawn('ffmpeg', [
        '-i', `${source}`,
        '-vf', 'scale=1920:1080,setsar=1',
        `${destination}/${fileName}.mp4`
    ]);

    ffmpegOutputHelper(ffmpeg);
}

module.exports = {
    scaleImage,
}