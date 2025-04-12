# PICO-JS - A Small JavaScript Retro Game Engine.

## What is this?

PICO-JS is a JavaScript 2D game engine for retro games heavily inspired by PICO-8 (lua) and [Pyxel](https://github.com/kitao/pyxel) (Python). Similar to these products it gets inspiration from, it provides the tools for you to focus more on builing the game and less on finding 3rd party software to create your assests.

The aim of PICO-JS is to be comfortable enough to just start wirting your game with not much thinking on the gameloop, where to make your sprites and sounds, how to provide a pause functionality or how to organize your code.

One of PICO-JS goals is also to be a option for the JS13GAMES game jam!

## We're building :construction:

PICO-JS is currently in early develpment. This is what we are working on:

- [ ] Optimize the canvas
- [ ] The PICO-JS API
- [ ] Mouse events
- [ ] Sound fx and music
- [ ] Sprites & maps designer
- [ ] Camera
- [ ] Maps
- [ ] Documentation

## How to use

Just create an `_update()` function and a `_draw()` function, and you are all set.

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
```

## Builds

- [pico-js.release.js](https://github.com/isacben/pico-js/blob/main/dist/pico-js.release.js)

To rebuild the engine, call `npm run build`
