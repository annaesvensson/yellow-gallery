<p align="right"><a href="README-de.md">Deutsch</a> &nbsp; <a href="README.md">English</a> &nbsp; <a href="README-sv.md">Svenska</a></p>

# Gallery 0.8.17

Bildgalleri med popup.

<p align="center"><img src="gallery-screenshot.png?raw=true" alt="Skärmdump"></p>

## Hur man lägger till ett bildgalleri

Skapa en `[gallery]` förkortning.

Följande argument är tillgängliga, alla utom det första argumentet är valfria:

`Pattern` = filnamn som reguljära uttryck  
`Sorting` = gallerisortering, t.ex. `name`, `modified`, `size`  
`Style` = galleristil, t.ex. `zoom`, `simple`  
`Size` = bildstorlek, pixel eller procent  

Bildformaten GIF, JPG, PNG och SVG stöds. Alla mediefiler finns i `media` mappen.
Mappen `media/images` är platsen för att lagra dina bilder. Mappen `media/thumbnails` innehåller miniatyrbilder. Du kan också skapa ytterligare mappar och organisera filer som du vill.

## Hur man visar bildtexter

Bildtexter kan konfigureras i språkinställningarna. Öppna filen `system/extensions/yellow-language.ini` och lägg till en ny rad för varje bild. En rad består av filnamn och beskrivning.

## Exempel

Lägga till ett bildgalleri, olika sorteringar:

    [gallery photo.*jpg name]
    [gallery photo.*jpg modified]
    [gallery photo.*jpg size]

Lägga till ett bildgalleri, olika storlekar:

    [gallery photo.*jpg name zoom 25%]
    [gallery photo.*jpg name zoom 50%]
    [gallery photo.*jpg name zoom 100%]

Lägga till ett bildgalleri, rektangulära miniatyrbilder:

    [gallery photo.*jpg name zoom 64]
    [gallery photo.*jpg name zoom 150]
    [gallery photo.*jpg name zoom 300]

Lägga till ett bildgalleri från en undermapp, rektangulära miniatyrbilder:

    [gallery photo-album/ name zoom 64]
    [gallery photo-album/ name zoom 150]
    [gallery photo-album/ name zoom 300]

Konfigurera bildtexter i språkinställningarna:

    Language: sv
    media/images/photo.jpg: Detta är en exempelbild
    media/images/photo-2387365-fika-time.jpg: Fika är en viktig del av vardagen i Sverige. Bild: Taylor Franz
    media/images/photo-2391666-start-painting.jpg: Akvareller, penslar och papper. Bild: Tim Arterbury
    media/images/photo-album/screenshot-2020-01.png: En liten webbplats av Adam Engel från Sverige.

## Inställningar

Följande inställningar kan konfigureras i filen `system/extensions/yellow-system.ini`:

`GallerySorting` = gallerisortering, t.ex. `name`, `modified`, `size`  
`GalleryStyle` = galleristil, t.ex. `zoom`, `simple`  

## Installation

[Ladda ner tillägg](https://github.com/annaesvensson/yellow-gallery/archive/main.zip) och kopiera zip-fil till din `system/extensions` mapp. Högerklicka om du använder Safari.

Detta tilläg innehåller [PhotoSwipe 4.1.2](https://github.com/dimsemenov/photoswipe) av Dmitry Semenov.

## Utvecklare

Anna Svensson. [Få hjälp](https://datenstrom.se/sv/yellow/help/).
