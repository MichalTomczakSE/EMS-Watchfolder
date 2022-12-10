const {unlink} = require('fs').promises;
const {colors} = require("./colors");
const {white, red} = colors;

const ffmpegOutputHelper = (ffmpeg,filePath) => {

    ffmpeg.stdout.on('data', (data) => {
        console.log(`${white}stdout: ${data}`);
    });

    ffmpeg.stderr.on('data', (data) => {
        console.error(`${red}stderr: ${data}`);
    });

    ffmpeg.on('close', async (code) => {
        console.log(`${white}child process exited with code ${code}`);
        await unlink(`${filePath}`)
    });
};

module.exports = {
    ffmpegOutputHelper,
}