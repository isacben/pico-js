/**
 * PICO-JS Engine Menu
 * - Controls the menu state
 * @namespace Menu
 */

'use strict';


/** Main menu state machine
 *  @type {{DISABLED: string, MAIN: string, OPTIONS: string}}
 *  @memberof Menu */
const menuState = {
    DISABLED: 'disabled',
    MAIN: 'main',
    OPTIONS: 'options',
};

/** Main menu items
 *  @type {Array<string>}
 *  @memberof Menu */
let menuItems = [];

/** Current engine menu state
 *  @type {{state: string, index: Number}}
 *  @memberof Menu */
let currentMenuState = {
    state: menuState.DISABLED,
    index: 0
}


/** Handle engine main menu
 *  @memberof Menu */
export function handle()
{
    switch (currentMenuState.state)
    {
        case menuState.DISABLED:
        engineCurrentState = engineState.PAUSED;
        paused = true;
        currentMenuState.state = menuState.MAIN;
        menuItems = ['continue', 'options', 'reset game'];
        break;
        case menuState.MAIN:
        switch (currentMenuState.index) {
            case 0: // select 'continue'
            currentMenuState.state = menuState.DISABLED;
            engineCurrentState = engineState.PLAYING;
            paused = false;
            break;
            case 1: // select 'options'
            currentMenuState.state = menuState.OPTIONS
            currentMenuState.index = 0;
            menuItems = [soundOn ? 'sound: on':'sound: off', `volume: ${printVolume()}`, 'back'];
            break;
        }
        break;
        case menuState.OPTIONS:
        switch (currentMenuState.index) {
            case 0: // enable/disable sound
            soundOn = !soundOn;
            menuItems[0] = soundOn ? "sound: on" : "sound: off";
            break;
            case 2: // select go back
            currentMenuState.state = menuState.MAIN;
            currentMenuState.index = 0;
            menuItems = ['continue', 'options', 'reset game'];
            break;
        }
        break;
    }
}


/** Draw engine menu
 *  @memberof Menu */
export function draw()
{
    rectfill(23, 43, 80, 36, 0);
    rect(23, 43, 80, 36, 7);

    // print the menu arrow icon (>)
    print('~', 27, 50 + currentMenuState.index * 8, 7);

    // print the menu items
    let y = 0;
    menuItems.forEach(item => {
        // push the selected menu forward
        let x = 0;
        if (currentMenuState.index === y)
                x = 1;

        // print the menu item
        print(item, 32 + x, 50 + y * 8, 7);
        y += 1;
    });
}

/** Update engine menu
 *  @memberof Menu */
export function update()
{
    // arrow up 
    if (keyWasPressed(2))
    {
        currentMenuState.index -= 1;
        if (currentMenuState.index < 0)
            currentMenuState.index = menuItems.length - 1;
    }
    
    // arrow down
    if (keyWasPressed(3))
    {
        currentMenuState.index += 1;
        if (currentMenuState.index >= menuItems.length)
            currentMenuState.index = 0;
    }

    // left and right keys for volume control
    if (currentMenuState.state === menuState.OPTIONS && currentMenuState.index === 1)
    {
        if (keyWasPressed(0))
            volume = Math.max(0, volume - 1);
        if (keyWasPressed(1))
            volume = Math.min(8, volume + 1);

        menuItems[1] =`volume: ${printVolume()}`;
    }
}

/** Print volume level
 *  @memberof Menu */
function printVolume() { return "0".repeat(volume) + "-".repeat(8-volume); }