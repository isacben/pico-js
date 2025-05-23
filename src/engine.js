/** 
 * PICO-JS - A tiny JavaScript Game Engine
 * MIT License - Copyright 2025 Isaac Benitez
 * 
 * Engine Features
 * 
 * Call engineInit() to start the engine!
 * @namespace Engine
 */

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

/** Array containing the engine colors
 *  @type {Array<String>}
 *  @memberof Engine */
const COLORS = [
  "#000000", "#1D2B53", "#7E2553", "#008751", 
  "#AB5236", "#5F574F", "#C2C3C7", "#FFF1E8", 
  "#FF004D", "#FFA300", "#FFEC27", "#00E436",
  "#29ADFF", "#83769C", "#FF77A8", "#FFCCAA"];

let bgColor = 0;

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
let paused = false;

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

/** Sprite sheet image
 * @type {HTMLImageElement}
 * @memberof Engine */
let spritesImg = new Image;
//rootElement.appendChild(spritesImg); // for debugging, display sprites sheet

function clamp(value, min=0, max=1) { return value < min ? min : value > max ? max : value; }
function lerp(percent, valueA, valueB) { return valueA + clamp(percent) * (valueB-valueA); }

/** Startup PICO-JS engine
 * @param {Function} _update - Called every frame to update the game objects
 * @param {Function} _draw - Called every frame to render the game objects
 * @param {{[key: string]: number[][]}} sprites - Contains the sprites to be used in the game
 * @memberof Engine  */
function engineInit(_update, _draw, sprites) {

    // Resize main canvas based on the browser window size
    function resizeCanvas() {
        cWidth = window.innerWidth;
        cHeight = window.innerHeight;

        const nativeRatio = NATIVE_WIDTH / NATIVE_HEIGHT;
        const browserWindowRatio = cWidth / cHeight;

        // browser window is too wide
        if (browserWindowRatio > nativeRatio) {
            cHeight = Math.floor(cHeight * windowPercentage); // optional
           if (cHeight > maxWidth) cHeight = maxHeight; // optional

            cWidth = Math.floor(cHeight * nativeRatio);
        } else {
        // browser window is too high
        cWidth = Math.floor(cWidth * windowPercentage); // optional
        if (cWidth > maxWidth) cWidth = maxWidth; // optional

        cHeight = Math.floor(cWidth / nativeRatio);
        }

        mainContext.canvas.style.width = `${cWidth}px`;
        mainContext.canvas.style.height = `${cHeight}px`;

        //_draw();
        //if (engineCurrentState === engineState.PAUSED) drawEngineMenu();
    }

    // Main engine game loop
    function engineUpdate(frameTimeMS=0) {
        const frameTimeDeltaMS = frameTimeMS - frameTimeLastMS;
        frameTimeLastMS = frameTimeMS;
        
        // show debug panel here
        // TODO
        averageFPS = lerp(.05, averageFPS, 1e3/(frameTimeDeltaMS||1));

        //frameTimeBufferMS += frameTimeDeltaMS;
        frameTimeBufferMS += paused ? 0 : frameTimeDeltaMS;

        resizeCanvas();

        if (paused)
        {
            // TODO: draw menu in overlay canvas
            inputUpdate();
            updateEngineMenu();
            inputUpdatePost();
        }
        else
        {
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
                inputUpdate();
                _update();
                inputUpdatePost();
            }

            // add the time smoothing back in
            frameTimeBufferMS += deltaSmooth;
        }

        _draw();
        print(`FPS: ${Math.floor(averageFPS)}`, 0, 0);
        // TODO: remove when there is an overlay canvas
        if (paused) drawEngineMenu();

        requestAnimationFrame(engineUpdate);
    }
  
    inputInit();
    drawSprites(sprites);

    // Setup the html file

    const rootElement = document.body;
    const styleRoot =
        'display: flex;' +
        'flex-direction: column;' +
        'justify-content: center;' +
        'align-items: center;' +
        'image-rendering: optimizeSpeed;' +
        'image-rendering: -moz-crisp-edges;' +
        'image-rendering: -o-crisp-edges;' +
        'image-rendering: -webkit-optimize-contrast;' +
        'image-rendering: optimize-contrast;' +
        'image-rendering: pixelated;' +
        '-ms-interpolation-mode: nearest-neighbor;' +
        'border: 0px;' +
        'cursor: none;' +
        'font-smooth: never;' +
        '-webkit-font-smoothing : none;';
    rootElement.style.cssText = styleRoot;
    mainCanvas = document.createElement('canvas');
    rootElement.appendChild(mainCanvas);
    mainContext = mainCanvas.getContext("2d", { alpha: true });
    mainContext.fillStyle = COLORS[6]; // default color
    mainContext.strokeStyle = COLORS[6]; // default color
    mainCanvas.width = cWidth * ratio;
    mainCanvas.height = cHeight * ratio; 
    mainCanvas.style.backgroundColor = COLORS[bgColor];
    mainContext.imageSmoothingEnabled = false;
    mainContext.scale(ratio,ratio);

    window.addEventListener('resize', resizeCanvas);
    requestAnimationFrame(engineUpdate);
}
