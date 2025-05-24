# PICO-JS - A Small JavaScript Retro Game Engine.

## What is this?

PICO-JS is a JavaScript 2D game engine for retro games heavily inspired by PICO-8 (lua) and Pyxel (Python). Similar to these products it gets inspiration from, it provides the tools for you to focus more on builing the game and less on finding 3rd party software to create your assests. It also takes a lot of ideas from LittleJS, another JavaScript game engine.

The aim of PICO-JS is to be comfortable enough to just start wirting your game with not much thinking on the gameloop, where to make your sprites and sounds, how to provide a pause functionality or how to organize your code.

One of PICO-JS goals is also to be a option for the JS13GAMES game jam!

## We're building :construction:

PICO-JS is currently in early develpment. See the API section below.

## Getting started

Create an `_update()` function and a `_draw()` function. Then just initialize the engine passing these functions and an object with sprites if needed:

Example:

```javascript
let posX = 0;
let inc = 1;

function _update() {
  posX += inc;
}

function _draw() {
  cls();
  circfill(posX, 60, 8, 4);
}

engineInit(_update, _draw, {});
```

## Sprites

The sprites object should contain 8x8 arrays that represent each sprite. The object can contain up to 128 sprites:

```javascript
const sprites = {
  0: [
    [],
    [, , , 9, 7, 7, 7],
    [, 9, 9, 9, 7, 7, 5],
    [7, 7, 7, 9, 9, 7, 7],
    [7, 7, 7, 7, 9, 8, 8, 8],
    [7, 7, 7, 7, 9, 9, 9],
    [, 7, 7, 9, 9, 9, ,],
    [],
  ],
};
```

## API

These is the API currently available in PICO-JS:

```
// Drawing functions
cls(color=0)                                    // Clear screen
rect(x, y, width, height, color=6)              // Draw a rectangle
rectfill(x, y, width, height, color=6)          // Draw a filled rectangle
circ(x, y, radius, color=6)                     // Draw a circle
circfill(x, y, radius, color=6)                 // Draw a filled circle
line(x0, y0, x1, y1, color=6)                   // Draw a line
spr(n, x, y, w=1, h=1)                          // Draw a sprite
print(str, posX, posY, color=6)                 // Print text

// Input functions
btn(b)                                          // Returns true when a button is pressed
btnp(b)                                         // Returns true when a button is down and it was not down the last frame

// TODO (* have priority)
pset
pget
sset
sget
fset *
fget *
color *
camera *
oval *
ovalfill *
sspr *
fillp
sfx *
music *
mget *
mset *
map *
tline
```

## Builds

- [pico-js.release.js](https://github.com/isacben/pico-js/blob/main/dist/pico-js.release.js)

To rebuild the engine, call `npm run build`
