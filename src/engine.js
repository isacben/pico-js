/** 
 * PICO-JS - A tiny JavaScript Game Engine
 * MIT License - Copyright 2025 Isaac Benitez
 * 
 * Engine Features
 * 
 * Call engineInit() to start the engine!
 * @namespace Engine
 */

import * as Input from './engineInput';
import * as Menu from './engineMenu';
import * as Draw from './engineDraw';

'use strict';

/** Name of the engine
 *  @type {String}
 *  @default
 *  @memberof Engine */
const engineName = 'PICO-JS';

/** Version of engine
 *  @type {String}
 *  @default
 *  @memberof Engine */
const engineVersion = '0.1.0';

/** Frames per second to update the game
 * @type {Number}
 * @default 60
 * @memberof Engine */
const frameRate = 60;

// Frame time tracking
let frameTimeLastMS = 0, frameTimeBufferMS = 0, averageFPS = 0;

/** Main engine state machine
 * @type {{PLAYING: string, PAUSED: string, MENU: string, RESET: string}}
 * @memberof Engine */
const engineState = {
  PLAYING: 'playing',
  PAUSED: 'paused',
  MENU: 'menu',
  RESET: 'reset'
};

/** Pause state
 * @type {Boolean}
 * @default false
 * @memberof Engine */
export let paused = false;

/** Engine volume
 *  @type {Number}
 *  @default 4
 *  @memberof Engine */
let volume = 4;

/** Engine sound control 
 *  @type {Boolean}
 *  @default true 
 *  @memberof Engine */
let soundOn = true;

/** Array to keep track of the number of frames that have passed when a button remains pressed
 * @type {Array<Number>}
 * @memberof Engine */
let pressedBtnCounter = [0, 0, 0, 0, 0];

/** Engine current state of the engine state machine
 * @type {String}
 * @default
 * @memberof Engine */
let engineCurrentState = engineState.PLAYING;

/** Prevents input continuing to the default browser handling (false by default)
 *  @type {Boolean}
 *  @memberof Engine */
let preventDefaultInput = false;

let accumulator = 0;
let previousTime = performance.now();

function clamp(value, min=0, max=1) { return value < min ? min : value > max ? max : value; }
function lerp(percent, valueA, valueB) { return valueA + clamp(percent) * (valueB-valueA); }

/** Startup PICO-JS engine
 * @param {Function} _update - Called every frame to update the game objects
 * @param {Function} _draw - Called every frame to render the game objects
 * @param {{[key: string]: number[][]}} sprites - Contains the sprites to be used in the game
 * @memberof Engine
 */
export function init( _update, _draw, sprites ) {
  const rootElement = document.getElementById('game');
  Draw.init( rootElement );

  // Main engine game loop
  function gameLoop(frameTimeMS=0) {
    const frameTimeDeltaMS = frameTimeMS - frameTimeLastMS;
    frameTimeLastMS = frameTimeMS;
    
    // show debug panel here
    // TODO
    averageFPS = lerp(.05, averageFPS, 1e3/(frameTimeDeltaMS||1));

    //frameTimeBufferMS += frameTimeDeltaMS;
    frameTimeBufferMS += paused ? 0 : frameTimeDeltaMS;

    if (paused) {
      // TODO: draw menu in overlay canvas
      Input.update();
      Menu.update();
      Input.updatePost();
    }
    else {
      // apply time delta smoothing, improves smoothness of framerate in some browsers
      let deltaSmooth = 0;
      if (frameTimeBufferMS < 0 && frameTimeBufferMS > -9)
      {
          // force at least one update each frame since it is waiting for refresh
          deltaSmooth = frameTimeBufferMS;
          frameTimeBufferMS = 0;
      }

      // update game state
      // update multiple frames if necessary in case of slow framerate
      for (;frameTimeBufferMS >= 0; frameTimeBufferMS -= 1e3 / frameRate) {
        Input.update();
        _update();
        Input.updatePost();
      }

      // add the time smoothing back in
      frameTimeBufferMS += deltaSmooth;
    }

    _draw();
    print(`FPS: ${Math.floor(averageFPS)}`, 0, 0);
    // TODO: remove when there is an overlay canvas
    if (paused) Menu.draw();

    requestAnimationFrame(gameLoop);
  }
  
  Input.init();
  Draw.drawSprites( sprites );

  requestAnimationFrame(gameLoop);
}