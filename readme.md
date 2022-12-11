# EMS-Watchfolder

The EMS-Watchfolder is a simple code that allows you to create a video from a sequence of png images on top and another image on the bottom.


## Requirements

To run the program, you will need to have the following installed:

-   node.js
-   ffmpeg

## Configuration

You will also need to prepare 4 folders:

1.  The input folder that accepts the background image.
2.  The intermediate folder that properly scales the transferred files to the 1920x1080 format.
3.  The output folder where the generated video appears through ffmpeg.
4.  The folder that stores the sequence of png images.

The configuration of these folders should be defined in the `processes.json` file:

```json
{  
"watchFolder": "/path/",
"transcodingFolder": "/path/",
"destinationFolder":  "/path/",
"sequenceFolder": "/path/"  
}
```
## Default configuration and usage

By default, **watchFolder** accepts files with the extensions defined in the `extension.js` file. If file is incorrect program unlinks it, and returns, and waits for next files.

If the format is correct, program stores its original name and ID in `data.json` file. After that `scaleImage.js` function starts to scale image file, and sends it to **transcodingFolder**.

After that `transcoder.js` which is listening to **transcodingFolder** runs `createVideo.js` function to create .mp4 video from **sequenceFolder** on top, and scaled image as a background.

Finally processed file is rendered to **destinationFolder**.
