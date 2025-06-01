/**
 * PICO-JS Engine Input Module
 * - Tracks keybiard pressed
 * @namespace Input
 */

'use strict';

/** Returns true if the button is down
 * @param {Number} b
 * @returns {Boolean}
 * @memberof Input */
function keyIsDown(b) { return !!(buttons[b] & 1) }

/** Returns true if the button was pressed this frame
 * @param {Number} b
 * @returns {Boolean} 
 * @memberof Input */
function keyWasPressed(b) { return !!(buttons[b] & 2); }

/** Clears all inputs
 * @memberof Input */
function clearInput() { buttons = [0, 0, 0, 0, 0]; }

/** Array of the available buttons in the engine
 * - 0: left
 * - 1: right
 * - 2: up
 * - 3: down
 * - 4: z
 * - 5: x
 * @type {Array<Number>}
 * @memberof Input */
let buttons = [0,0,0,0,0];

//////////////////////////////////////////////////
// Input update called by the engine

function inputUpdate()
{
  if (!document.hasFocus()) {
    // if the document is not focused, clear all inputs
    clearInput();
  }
}

function inputUpdatePost()
{
  for (const b in buttons)
    buttons[b] &= 1;
}

//////////////////////////////////////////////////
// Input event handlers

const keyMap = {
    "ArrowLeft": 0,
    "ArrowRight": 1,
    "ArrowUp": 2,
    "ArrowDown": 3,
    "KeyZ": 4,
    "KeyX": 5
  };

function inputInit()
{
  onkeydown = (e) =>
  {
    if (!e.repeat)
    {
        if (e.code === "Enter")
        {
            handleMenu();
        }
        else if (keyMap.hasOwnProperty(e.code))
        {
            buttons[keyMap[e.code]] = 3;
        }
    }
    e.preventDefault();
  }

  onkeyup = (e) => {
    const idx = keyMap[e.code];
    if (idx !== undefined) {
      buttons[idx] = 4;
      pressedBtnCounter[idx] = 0;
    }
  }

  // reset input when focus is lost
  onblur = (e) => clearInput(); 
}