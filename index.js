const [,,watchFolder,transcodingFolder,destinationFolder] = process.argv;
const {ingestFolder} = require("./watchfolders/source");
const {videoTranscoder} = require("./watchfolders/transcoder");
ingestFolder(watchFolder,transcodingFolder);
videoTranscoder(transcodingFolder,destinationFolder);
