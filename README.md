# single-line-3d-text

## Single-line fonts
JavaScript for single-line 3D text to be used in three.js. Regular fonts characters are usually outline fonts. The font file describes the outline of the characters, and the outline is filled with a color. The fill is the only actual visible part.

In a single-line font the line itself is the visible part of the font. It makes for much simpler font files. Compare it to writing with a pen: It's much quicker and simpler to directly write characters as lines than to draw them as outlined shapes and fill in the shapes. 

Single-line fonts are also knowns as engraving fonts, stroke fonts, technical lettering fonts, pen plotter fonts or stick fonts.

![Font comparison](public/img/font_comparison.jpg?raw=true 'Font comparison')

## Setup

To install and start do the usual:

```bash
$ yarn install
$ yarn start
```
...and the app will be available at localhost:3009

Or see it here on GitHub Pages: 
### [https://hisschemoller.github.io/single-line-3d-text/](https://hisschemoller.github.io/single-line-3d-text/)

## Minimal 3D text for Three.js
I needed a simple text format for a 3D project, so that the text would use minimal resources and the processor could devote all it's power to smooth animation and steady timing. This code renders text in the simplest way possible, in 3D. Each character is just a few straight lines rendered with a `LineBasicMaterial`.

## Asteroids
I found an interesting [summary of single-line fonts](http://www.imajeenyus.com/computer/20150110_single_line_fonts/index.shtml) by [Lindsay Robert Wilson](http://www.imajeenyus.com/about_me.shtml), which mentions the font used in Atari's 1979 [Asteroids](https://en.wikipedia.org/wiki/Asteroids_(video_game)) game.

Atari programmer [Ed Logg](https://en.wikipedia.org/wiki/Ed_Logg) made the original font. More recently [Trammell Hudson](https://trmm.net/About) made a slightly [adjusted version of the font](https://trmm.net/Asteroids_font) for his own projects, of which he put the [source file on GitHub](https://github.com/osresearch/vst/blob/master/teensyv/asteroids_font.c).

![Asteroids](public/img/ed_logg_asteroids.jpg?raw=true 'Asteroids')

Image: Ed Logg's original hand-drawn sketch on the left and Trammell Hudson's variation on the right. (image from Trammell Hudson's website)

## Three.js implementation

The font description in the C file was easy to translate to a JSON file with SVG paths:

```c
const asteroids_char_t asteroids_font[] = {
	['0' - 0x20] = { P(0,0), P(8,0), P(8,12), P(0,12), P(0,0), P(8,12), FONT_LAST },
	['1' - 0x20] = { P(4,0), P(4,12), P(3,10), FONT_LAST },
	['2' - 0x20] = { P(0,12), P(8,12), P(8,7), P(0,5), P(0,0), P(8,0), FONT_LAST },
```

```json
{
  "chars": {
    "0": "M0 12 L8 12 L8 0 L0 0 L0 12 L8 0",
    "1": "M4 12 L4 0 L3 2",
    "2": "M0 0 L8 0 L8 5 L0 7 L0 12 L8 12",
```

From there I could take some functions from ThreeJS's `SVGLoader` to parse the SVG strings into `Path` objects, en then create `Line` objects for each character and align them horizontally as a line of text in a `Group`.

Very cheap and simple text. The only thing I don't like about the `LineBasicMaterial` text is that lines can only be 1 pixel wide. I would have liked to be able to adjust the line thickness.

![Ed Logg](public/img/ed_logg.jpg?raw=true 'Ed Logg')

Ed Logg, designer of Asteroids (image: Aaron Hightower/Wikipedia) 
