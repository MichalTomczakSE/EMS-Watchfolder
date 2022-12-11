const pathTo = require('./data/processes.json')

const {ingestFolder} = require("./watchfolders/source");
const {videoTranscoder} = require("./watchfolders/transcoder");
ingestFolder(pathTo.watchFolder,pathTo.transcodingFolder);
videoTranscoder(pathTo.sequenceFolder,pathTo.transcodingFolder,pathTo.destinationFolder);
