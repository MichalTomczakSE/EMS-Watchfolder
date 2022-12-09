const {watch} = require('chokidar');
const {readFile, writeFile, unlink} = require('fs').promises;
const {basename, extname} = require('path');
const ffmpeg = require('fluent-ffmpeg');

const watchFolder = process.argv[2];
const transcodingFolder = process.argv[3];

const {colors} = require('./utils/colors');
const {green, yellow, red, white} = colors;
const {acceptableFileExtensions: extensions} = require('./data/extensions');

watch(`${watchFolder}`, {
    usePooling: true,
    awaitWriteFinish: true,
    ignoreInitial: true,
})
    .on('add', async path => {
        const fileName = String(basename(path));
        console.log(`${white}File ${fileName} has been added to ${watchFolder}`)
        try {
            if (!extensions.includes(extname(path))) {
                await unlink(`${watchFolder}/${fileName}`)
                return console.log(`${red}Wrong file format, program is aborted`);
            }
            const data = JSON.parse(await readFile('./data/data.json', {
                encoding: 'utf8',
            }));
            data.files.push(
                {
                    'name': `${fileName}`,
                    'id': `${data.files.length}`
                });
            data.id = data.files.length;

            await writeFile('./data/data.json', JSON.stringify(data));

            console.log('File has been successfully saved in database, and moved to transcoder!');

            await ffmpeg(`${watchFolder}/${fileName}`)
                .size('1920x1080')
                .on('end', async() => {
                    await unlink(`${watchFolder}/${fileName}`)
                    console.log(`${green} file scaled and copied successfully! Generating video starting soon...`)
                })
                .output(`${transcodingFolder}/${fileName.slice(0,10)}`)
                .run();

        } catch (error) {
            if (error) {
                console.log(`${red} ${error}`)
            }
        }
    })
    .on('error', error => console.log(`${red}Error:`, error))
    .on('unlink', (path) => console.log(`${yellow}File ${basename(path)} has been deleted.`))
    .on('ready', () => console.log(`${green}Initial scan complete. Ready for changes`));
