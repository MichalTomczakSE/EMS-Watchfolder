const {watchFolder, transcodingFolder, destinationFolder, sequenceFolder} = require('./data/processes.json')
const {ingestFolder} = require("./watchfolders/source");
const {videoTranscoder} = require("./watchfolders/transcoder");
ingestFolder(watchFolder,transcodingFolder);
videoTranscoder(sequenceFolder,transcodingFolder,destinationFolder);