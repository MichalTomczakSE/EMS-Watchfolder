const watchFolder = process.argv[2];
const transcodingFolder = process.argv[3];
const destinationFolder = process.argv[4];

const {ingestFolder} = require("./watchfolders/source");


ingestFolder(watchFolder,transcodingFolder);

