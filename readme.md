# EMS-Watchfolder

The EMS-Watchfolder is a simple code that allows you to create a video from a sequence of png images on top and another image on the bottom.

## 'Preview'


- This is how looks your starting photo
>![Cute_dog](https://user-images.githubusercontent.com/116025688/207705631-ed0c7f79-0336-4db9-b1f8-f64ea64bb4be.jpg)
- This is how looks your sequence images after rendering
>![front](https://user-images.githubusercontent.com/116025688/207705849-5a9f6b2f-af3e-410f-8fa4-0e67b997671c.gif)
- And this is final result of merging image as background with sequence on front!
>![black](https://user-images.githubusercontent.com/116025688/207705663-ed36d51c-bb66-4e0a-bcc3-306dff0ac038.gif)


### Requirements

To run the program, you will need to have the following installed and added to the PATH environment variable:

-   node.js 
-   ffmpeg

### Configuration

You will also need to prepare 4 folders:

1.  The input folder that accepts the background image named ``watchFolder``.
2.  The intermediate folder that properly scales the transferred files to the 1920x1080 format named ``transcodingFolder``
3.  The output folder where the generated video appears through ffmpeg  named ``destinationFolder``
4.  The folder that stores the sequence of png images - named ``sequenceFolder``

The absolute path of these folders should be defined in the `processes.json` file right there:

```json
{  
"watchFolder": "/path/",
"transcodingFolder": "/path/",
"destinationFolder":  "/path/",
"sequenceFolder": "/path/"  
}
```
Rest options are there to define ffmpeg parameters for spawn **scaleImage** and **createVideo** function. If you want to learn more, check FFMPEG documentation.

https://ffmpeg.org/ffmpeg.html

## Default configuration and usage

By default, ``watchFolder`` accepts files with the extensions defined in the **extension.js** file. If file is incorrect program unlinks it, and returns, and waits for next files.

If the format is correct, program stores its original name and ID in **data.json** file. After that **scaleImage.js** function starts to scale image file, and sends it to ``transcodingFolder``.

After that function in **transcoder.js** which is listening to ``transcodingFolder`` runs function declared in **createVideo.js** and starts creating .mp4 video from ``sequenceFolder`` on top, and scaled image as a background.

Finally processed file is rendered to ``destinationFolder``.
