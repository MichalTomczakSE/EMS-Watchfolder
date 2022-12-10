const { spawn } = require('child_process');
const {ffmpegOutputHelper} = require("./errorHandler");
const createVideo = (background, fileName) => {

    const ffmpeg = spawn('ffmpeg', [

        '-i', `C:\\PRACA\\EMS_WATCHFOLDER\\data\\sequence\\ramka_%05d.png`,
        '-i', `${background}`, '-s', '1920x1080',
        '-filter_complex', '[1:v][0:v]overlay=0:0[out]',
        '-map', '[out]',
        '-c:v', 'libx264',
        '-b:v', '5M',
        `C:\\destination\\${fileName.slice(0,10)}.mp4`
    ]);

    ffmpegOutputHelper(ffmpeg,background);
}

module.exports = {
    createVideo,
}