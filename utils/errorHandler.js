const {white, red} = require("./colors");

const ffmpegOutputHelper = ffmpeg => {

ffmpeg.stdout.on('data', (data) => {
    console.log(`${white}stdout: ${data}`);
});

ffmpeg.stderr.on('data', (data) => {
    console.error(`${red}stderr: ${data}`);
});

ffmpeg.on('close', (code) => {
    console.log(`${white}child process exited with code ${code}`);
});
};

module.exports = {
    ffmpegOutputHelper,
}