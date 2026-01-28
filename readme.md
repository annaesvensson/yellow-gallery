# Gallery 0.9.4

Image gallery with popup. Developed by Anna Svensson.

<p align="center"><img src="screenshot.png" alt="Screenshot"></p>

## How to install an extension

[Download ZIP file](https://github.com/annaesvensson/yellow-gallery/archive/refs/heads/main.zip) and copy it file into your `system/extensions` folder. [Learn more about extensions](https://github.com/annaesvensson/yellow-update).

## How to add an image gallery

Create a `[gallery]` shortcut.

The following arguments are available, all but the first argument are optional:

`Pattern` = file name as regular expression  
`Sorting` = gallery sorting, e.g. `name`, `modified`, `size`  
`Style` = gallery style, e.g. `zoom`, `simple`  
`Size` = image size, pixel or percent  

The image formats GIF, JPEG, PNG and SVG are supported. All media files are located in the `media` folder. The `media/images` folder is the place to store your images. The `media/thumbnails` folder contains image thumbnails. You can also create additional folders and organise files as you like.

## How to show image captions

Image captions can be configured in the language settings. Open file `system/extensions/yellow-language.ini` and add a new line for each image. A line consists of file name and description. The image caption is displayed when you click on an image or use a screen reader.

## Examples

Content file with image gallery:

    ---
    Title: Example page
    ---
    This is an example page with image gallery.

    [gallery photo]

Adding an image gallery, different sortings:

    [gallery photo.*jpg name]
    [gallery photo.*jpg modified]
    [gallery photo.*jpg size]

Adding an image gallery, different sizes:

    [gallery photo.*jpg name zoom 25%]
    [gallery photo.*jpg name zoom 50%]
    [gallery photo.*jpg name zoom 100%]

Adding an image gallery, square thumbnails:

    [gallery photo.*jpg name zoom 64]
    [gallery photo.*jpg name zoom 150]
    [gallery photo.*jpg name zoom 300]

Adding an image gallery from a subfolder, square thumbnails:

    [gallery photo-album/ name zoom 64]
    [gallery photo-album/ name zoom 150]
    [gallery photo-album/ name zoom 300]

Configuring image captions in the language settings:

    Language: en
    media/images/photo.jpg: This is an example image
    media/images/photo-2387365-fika-time.jpg: Fika is an important part of life in Sweden. Photo: Taylor Franz
    media/images/photo-2493837-lake-and-forest.jpg: Lake and forest in the summer. Photo: Anatoliy Gromov
    media/images/photo-album/screenshot-2020-01.png: A small website by Adam Engel from Sweden.

Selecting file names with a regular expression:

`photo` = image files starting with "photo" followed by whatever  
`photo.*jpg` = image files starting with "photo" followed by whatever and "jpg"  
`photo.*jpeg` = image files starting with "photo" followed by whatever and "jpeg"  
`photo-album/` = image files from subfolder "photo-album" followed by whatever  
`photo-album` = image files starting with "photo-album" followed by whatever  

## Settings

The following settings can be configured in file `system/extensions/yellow-system.ini`:

`GallerySorting` = gallery sorting, e.g. `name`, `modified`, `size`  
`GalleryStyle` = gallery style, e.g. `zoom`, `simple`  

## Acknowledgements

This extension includes [PhotoSwipe 4.1.2](https://github.com/dimsemenov/photoswipe) by Dmitry Semenov. Thank you for the good work.

Do you have questions? [Get help](https://datenstrom.se/yellow/help/).
