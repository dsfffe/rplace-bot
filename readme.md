[rplace.tk](https://rplace.tk) bot generator ( not working anymore )

## prerequisite

- you need [deno](https://deno.land) installed
- you may also need internet connection to download libraries for executing bot
  generator

## Usage

```
deno run --allow-all image_mapper.ts <input.png> <output.js>
```

## how to use generated bot

after the command above you will have a source code for a bot, every thing you
need before using it is adding a line at the top of file

```js
window.destPosition = {x:<x-of-destination-position>,y:<y-of-destination-position>}
```

you can also upload it to a cors enabled storage ( like raw.githubusercontent.com ) place and then
use it like :

```javascript
let destPosition = { x: 1550, y: 1140 };
fetch("url-to-uploaded-file-allowing-cross-origin-request")
  .then((b) => b.text())
  .then((b) => (alert("injected"), b))
  .then((b) => eval(b))
  .catch((e) => alert("error" + e));
```

### files description:

#### generateCode.ts

this file's code is responsible for generating the output code based on a
converted json image

#### getBoardJSONFromImage.ts

generates that json board based on an image

#### utils.ts

utilities to work with colors and hex colors + rplace.tk's color plate

#### gimp-palette-generator.ts

generates gimp color palette based on rplace.tk's palette

#### image_mapper.ts

a cli program for generating a bot based on source code
