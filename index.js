const [,watchFolder,transcodingFolder,destinationFolder] = process.argv;
const {ingestFolder} = require("./watchfolders/source");

ingestFolder(watchFolder,transcodingFolder);

