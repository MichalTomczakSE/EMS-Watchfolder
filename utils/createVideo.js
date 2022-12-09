const ffmpeg = require("fluent-ffmpeg");

const createVideo = (imageSequence, backgroundImage, outputFilename) => {
    ffmpeg()
        .input(imageSequence)
        .input(backgroundImage)
        .complexFilter(
            [
                {
                    filter: 'scale',
                    options: '1920x1080',
                    inputs: '[0:v]',
                    outputs: 'scaled'
                },
                {
                    filter: 'overlay',
                    options: 'shortest=1',
                    inputs: ['scaled', '[1:v]'],
                    outputs: 'output'
                }
            ],
            'output'
        )
        .output(outputFilename)
        .run();
}

module.exports = {
    createVideo,
}