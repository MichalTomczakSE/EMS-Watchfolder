const {spawn} = require('child_process');
const {ffmpegOutputHelper} = require("./errorHandler");
const createVideo = (sequenceFolder, background, destination, fileName) => {
    const {
        input,
        framerate,
        framerateValue,
        scale,
        resolution,
        filter,
        filterOptions,
        mapper,
        mapOutput,
        setVideoCodec,
        videoCodec,
        setVideoBitrate,
        videoBitrate
    } = require('../data/processes.json')
    const ffmpeg = spawn('ffmpeg', [
        framerate, framerateValue,
        input, sequenceFolder,
        input, background,
        scale, resolution,
        filter, filterOptions,
        mapper, mapOutput,
        setVideoCodec, videoCodec,
        setVideoBitrate, videoBitrate,
        `${destination}/${fileName.slice(0, 10)}.mp4`
    ]);

    ffmpegOutputHelper(ffmpeg, background);
}

module.exports = {
    createVideo,
}