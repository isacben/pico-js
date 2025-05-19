/**
 * PICO-JS Engine Input Module
 * - Tracks keybiard pressed
 * @namespace Input
 */

import { handle as handleMenu } from "./engineMenu";

/** Returns true if the button is down
 * @param {Number} b
 * @returns {Boolean}
 * @memberof Input */
export function keyIsDown(b) { return !!(buttons[b] & 1) }

/** Returns true if the button was pressed this frame
 * @param {Number} b
 * @returns {Boolean} 
 * @memberof Input */
export function keyWasPressed(b) { return !!(buttons[b] & 2); }

/** Clears all inputs
 * @memberof Input */
export function clearInput() { buttons = [0, 0, 0, 0, 0]; }

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

export function update()
{
  if (!document.hasFocus()) {
    // if the document is not focused, clear all inputs
    clearInput();
  }
}

export function updatePost()
{
  for (const b in buttons)
    buttons[b] &= 1;
}

//////////////////////////////////////////////////
// Input event handlers

export function init()
{
  onkeydown = (e) =>
  {
    if (!e.repeat)
    {
      switch (e.code)
      {
        case "ArrowLeft":
          buttons[0] = 3;
          break;
        case "ArrowRight":
          buttons[1] = 3;
          break;
        case "ArrowUp":
          buttons[2] = 3;
          break;
        case "ArrowDown":
          buttons[3] = 3;
          break;
        case "KeyZ":
          buttons[4] = 3;
          break;
        case "KeyX":
          buttons[5] = 3;
          break;
        case "Enter":
          handleMenu();
          break;
      }
    }
    e.preventDefault();
  }

  onkeyup = (e) => {
    switch (e.code) {
      case "ArrowLeft":
        buttons[0] = 4;
        pressedBtnCounter[0] = 0;
        break;
      case "ArrowRight":
        buttons[1] = 4;
        pressedBtnCounter[1] = 0;
        break;
      case "ArrowUp":
        buttons[2] = 4;
        pressedBtnCounter[2] = 0;
        break;
      case "ArrowDown":
        buttons[3] = 4;
        pressedBtnCounter[3] = 0;
        break;
      case "KeyZ":
        buttons[4] = 4;
        pressedBtnCounter[4] = 0;
        break;
      case "KeyX":
        buttons[5] = 4;
        pressedBtnCounter[5] = 0;
        break;
    }
  }

  // reset input when focus is lost
  onblur = (e) => clearInput(); 
}