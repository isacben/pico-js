(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // src/engineApi.js
  var engineApi_exports = {};
  __export(engineApi_exports, {
    btn: () => btn,
    circ: () => circ,
    circfill: () => circfill,
    cls: () => cls,
    engineInit: () => engineInit,
    line: () => line2,
    print: () => print2,
    spr: () => spr
  });

  // src/constants.js
  var COLORS = [
    "#000000",
    "#1D2B53",
    "#7E2553",
    "#008751",
    "#AB5236",
    "#5F574F",
    "#C2C3C7",
    "#FFF1E8",
    "#FF004D",
    "#FFA300",
    "#FFEC27",
    "#00E436",
    "#29ADFF",
    "#83769C",
    "#FF77A8",
    "#FFCCAA"
  ];
  var BGCOLOR = 0;

  // src/engineFont.js
  var engineChars = {
    "~": [
      [1],
      [1, 1],
      [1, 1, 1],
      [1, 1],
      [1]
    ],
    "!": [
      [, 1],
      [, 1],
      [, 1],
      [, ,],
      [, 1]
    ],
    '"': [
      [1, , 1],
      [1, , 1]
    ],
    "#": [
      [1, , 1],
      [1, 1, 1],
      [1, , 1],
      [1, 1, 1],
      [1, , 1]
    ],
    "$": [
      [1, 1, 1],
      [1, 1],
      [, 1, 1],
      [1, 1, 1],
      [, 1]
    ],
    "%": [
      [1, , 1],
      [, , 1],
      [, 1],
      [1],
      [1, , 1]
    ],
    "&": [
      [1, 1],
      [1, 1],
      [, 1, 1],
      [1, , 1],
      [1, 1, 1]
    ],
    "'": [
      [, 1],
      [1]
    ],
    "(": [
      [, 1],
      [1],
      [1],
      [1],
      [, 1, ,]
    ],
    ")": [
      [, 1],
      [, , 1],
      [, , 1],
      [, , 1],
      [, 1]
    ],
    "*": [
      [1, , 1],
      [, 1],
      [1, 1, 1],
      [, 1],
      [1, , 1]
    ],
    "+": [
      [],
      [, 1],
      [1, 1, 1],
      [, 1]
    ],
    ",": [
      [],
      [],
      [],
      [, 1],
      [1]
    ],
    "-": [
      [],
      [],
      [1, 1, 1]
    ],
    ".": [
      [],
      [],
      [],
      [],
      [, 1, ,]
    ],
    "/": [
      [, , 1],
      [, 1],
      [, 1],
      [, 1],
      [1]
    ],
    ":": [
      [,],
      [, 1],
      [],
      [, 1, ,]
    ],
    ";": [
      [,],
      [, 1],
      [],
      [, 1],
      [1, , ,]
    ],
    "<": [
      [, , 1],
      [, 1],
      [1],
      [, 1],
      [, , 1]
    ],
    "=": [
      [],
      [1, 1, 1],
      [],
      [1, 1, 1]
    ],
    ">": [
      [1],
      [, 1],
      [, , 1],
      [, 1],
      [1]
    ],
    "?": [
      [1, 1, 1],
      [, , 1],
      [, 1, 1],
      [],
      [, 1]
    ],
    "@": [
      [, 1],
      [1, , 1],
      [1, , 1],
      [1],
      [, 1, 1]
    ],
    "{": [
      [, 1, 1],
      [, 1],
      [1, 1],
      [, 1],
      [, 1, 1]
    ],
    "|": [
      [, 1],
      [, 1],
      [, 1],
      [, 1],
      [, 1, ,]
    ],
    "}": [
      [1, 1],
      [, 1],
      [, 1, 1],
      [, 1],
      [1, 1]
    ],
    "[": [
      [1, 1],
      [1],
      [1],
      [1],
      [1, 1, ,]
    ],
    "\\": [
      [1],
      [, 1],
      [, 1],
      [, 1],
      [, , 1]
    ],
    "]": [
      [, 1, 1],
      [, , 1],
      [, , 1],
      [, , 1],
      [, 1, 1]
    ],
    "0": [
      [1, 1, 1],
      [1, , 1],
      [1, , 1],
      [1, , 1],
      [1, 1, 1]
    ],
    "1": [
      [1, 1],
      [, 1],
      [, 1],
      [, 1],
      [1, 1, 1]
    ],
    "2": [
      [1, 1, 1],
      [, , 1],
      [1, 1, 1],
      [1],
      [1, 1, 1]
    ],
    "3": [
      [1, 1, 1],
      [, , 1],
      [, 1, 1],
      [, , 1],
      [1, 1, 1]
    ],
    "4": [
      [1, , 1],
      [1, , 1],
      [1, 1, 1],
      [, , 1],
      [, , 1]
    ],
    "5": [
      [1, 1, 1],
      [1],
      [1, 1, 1],
      [, , 1],
      [1, 1, 1]
    ],
    "6": [
      [1],
      [1],
      [1, 1, 1],
      [1, , 1],
      [1, 1, 1]
    ],
    "7": [
      [1, 1, 1],
      [, , 1],
      [, , 1],
      [, , 1],
      [, , 1]
    ],
    "8": [
      [1, 1, 1],
      [1, , 1],
      [1, 1, 1],
      [1, , 1],
      [1, 1, 1]
    ],
    "9": [
      [1, 1, 1],
      [1, , 1],
      [1, 1, 1],
      [, , 1],
      [, , 1]
    ],
    "A": [
      [1, 1, 1],
      [1, , 1],
      [1, 1, 1],
      [1, , 1],
      [1, , 1]
    ],
    "B": [
      [1, 1, 1],
      [1, , 1],
      [1, 1],
      [1, , 1],
      [1, 1, 1]
    ],
    "C": [
      [, 1, 1],
      [1],
      [1],
      [1],
      [, 1, 1]
    ],
    "D": [
      [1, 1],
      [1, , 1],
      [1, , 1],
      [1, , 1],
      [1, 1, 1]
    ],
    "E": [
      [1, 1, 1],
      [1],
      [1, 1],
      [1],
      [1, 1, 1]
    ],
    "F": [
      [1, 1, 1],
      [1],
      [1, 1],
      [1],
      [1]
    ],
    "G": [
      [, 1, 1],
      [1],
      [1],
      [1, , 1],
      [1, 1, 1]
    ],
    "H": [
      [1, , 1],
      [1, , 1],
      [1, 1, 1],
      [1, , 1],
      [1, , 1]
    ],
    "I": [
      [1, 1, 1],
      [, 1],
      [, 1],
      [, 1],
      [1, 1, 1]
    ],
    "J": [
      [1, 1, 1],
      [, 1],
      [, 1],
      [, 1],
      [1, 1]
    ],
    "K": [
      [1, , 1],
      [1, , 1],
      [1, 1],
      [1, , 1],
      [1, , 1]
    ],
    "L": [
      [1],
      [1],
      [1],
      [1],
      [1, 1, 1]
    ],
    "M": [
      [1, 1, 1],
      [1, 1, 1],
      [1, , 1],
      [1, , 1],
      [1, , 1]
    ],
    "N": [
      [1, 1],
      [1, , 1],
      [1, , 1],
      [1, , 1],
      [1, , 1]
    ],
    "O": [
      [, 1, 1],
      [1, , 1],
      [1, , 1],
      [1, , 1],
      [1, 1]
    ],
    "P": [
      [1, 1, 1],
      [1, , 1],
      [1, 1, 1],
      [1],
      [1]
    ],
    "Q": [
      [, 1],
      [1, , 1],
      [1, , 1],
      [1, 1],
      [, 1, 1]
    ],
    "R": [
      [1, 1, 1],
      [1, , 1],
      [1, 1],
      [1, , 1],
      [1, , 1]
    ],
    "S": [
      [, 1, 1],
      [1],
      [1, 1, 1],
      [, , 1],
      [1, 1]
    ],
    "T": [
      [1, 1, 1],
      [, 1],
      [, 1],
      [, 1],
      [, 1]
    ],
    "U": [
      [1, , 1],
      [1, , 1],
      [1, , 1],
      [1, , 1],
      [, 1, 1]
    ],
    "V": [
      [1, , 1],
      [1, , 1],
      [1, , 1],
      [1, 1, 1],
      [, 1]
    ],
    "W": [
      [1, , 1],
      [1, , 1],
      [1, , 1],
      [1, 1, 1],
      [1, 1, 1]
    ],
    "X": [
      [1, , 1],
      [1, , 1],
      [, 1],
      [1, , 1],
      [1, , 1]
    ],
    "Y": [
      [1, , 1],
      [1, , 1],
      [1, 1, 1],
      [, , 1],
      [1, 1, 1]
    ],
    "Z": [
      [1, 1, 1],
      [, , 1],
      [, 1],
      [1],
      [1, 1, 1]
    ],
    " ": [
      [, , ,]
    ]
  };

  // src/engineDraw.js
  var TILE_SIZE = 8;
  var NATIVE_WIDTH = TILE_SIZE * 16;
  var NATIVE_HEIGHT = TILE_SIZE * 16;
  var maxMultiplier = 10;
  var maxWidth = NATIVE_WIDTH * maxMultiplier;
  var maxHeight = NATIVE_HEIGHT * maxMultiplier;
  var windowPercentage = 0.9;
  var cWidth = NATIVE_WIDTH;
  var cHeight = NATIVE_HEIGHT;
  var canvas = null;
  var ctx2 = null;
  function clearScreen(color) {
    ctx2.fillStyle = COLORS[color || BGCOLOR];
    canvas.style.backgroundColor = COLORS[color || BGCOLOR];
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
  }
  function circle(centerX, centerY, radius, color, filled = false) {
    let x = 0;
    let y = radius;
    let decisionParameter = 1 - radius;
    ctx2.fillStyle = color;
    if (filled)
      drawHorizontalLine(centerX - radius, centerX + radius, centerY);
    else
      plotCirclePoints(centerX, centerY, x, y);
    while (x < y) {
      x++;
      if (decisionParameter < 0)
        decisionParameter += 2 * x + 1;
      else {
        y--;
        decisionParameter += 2 * (x - y) + 1;
      }
      if (filled) {
        drawHorizontalLine(centerX - x, centerX + x, centerY + y);
        drawHorizontalLine(centerX - x, centerX + x, centerY - y);
        drawHorizontalLine(centerX - y, centerX + y, centerY + x);
        drawHorizontalLine(centerX - y, centerX + y, centerY - x);
      } else
        plotCirclePoints(centerX, centerY, x, y);
    }
  }
  function line(x0, y0, x1, y1, color = 6) {
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = x0 < x1 ? 1 : -1;
    let sy = y0 < y1 ? 1 : -1;
    let err = (dx > dy ? dx : -dy) / 2;
    ctx2.fillStyle = COLORS[color];
    while (true) {
      ctx2.fillRect(x0, y0, 1, 1);
      if (x0 === x1 && y0 === y1) break;
      let e2 = err;
      if (e2 > -dx) {
        err -= dy;
        x0 += sx;
      }
      if (e2 < dy) {
        err += dx;
        y0 += sy;
      }
    }
  }
  function plotCirclePoints(centerX, centerY, x, y) {
    plotPixel(centerX + x, centerY + y);
    plotPixel(centerX - x, centerY + y);
    plotPixel(centerX + x, centerY - y);
    plotPixel(centerX - x, centerY - y);
    plotPixel(centerX + y, centerY + x);
    plotPixel(centerX - y, centerY + x);
    plotPixel(centerX + y, centerY - x);
    plotPixel(centerX - y, centerY - x);
  }
  function plotPixel(x, y) {
    ctx2.fillRect(x, y, 1, 1);
  }
  function drawHorizontalLine(x1, x2, y) {
    for (let x = x1; x <= x2; x++)
      ctx2.fillRect(x, y, 1, 1);
  }
  function resizeCanvas() {
    cWidth = window.innerWidth;
    cHeight = window.innerHeight;
    const nativeRatio = NATIVE_WIDTH / NATIVE_HEIGHT;
    const browserWindowRatio = cWidth / cHeight;
    if (browserWindowRatio > nativeRatio) {
      cHeight = Math.floor(cHeight * windowPercentage);
      if (cHeight > maxWidth) cHeight = maxHeight;
      cWidth = Math.floor(cHeight * nativeRatio);
    } else {
      cWidth = Math.floor(cWidth * windowPercentage);
      if (cWidth > maxWidth) cWidth = maxWidth;
      cHeight = Math.floor(cWidth / nativeRatio);
    }
    ctx2.canvas.style.width = `${cWidth}px`;
    ctx2.canvas.style.height = `${cHeight}px`;
  }
  function init(target) {
    canvas = document.createElement("canvas");
    ctx2 = canvas.getContext("2d", { alpha: true });
    const ratio = window.devicePixelRatio || 1;
    canvas.width = cWidth * ratio;
    canvas.height = cHeight * ratio;
    ctx2.imageSmoothingEnabled = false;
    canvas.style.backgroundColor = COLORS[BGCOLOR];
    canvas.style.imageRendering = "pixelated";
    console.log(canvas);
    ctx2.scale(ratio, ratio);
    target.appendChild(canvas);
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
  }
  var spritesImg = new Image();
  function drawSprites(sprites) {
    const spritesCanvas = document.createElement("canvas");
    spritesCanvas.width = 128;
    spritesCanvas.height = 128;
    let c = spritesCanvas.getContext("2d");
    let x = 0;
    let y = 0;
    Object.keys(sprites).forEach((key) => {
      const sprite2 = sprites[key];
      let currY = 0;
      x = Math.floor(Number(key) % 16) * 8;
      y = Math.floor(Number(key) / 16) * 8;
      for (let row = 0; row < sprite2.length; row++) {
        let currRow = sprite2[row];
        for (let col = 0; col < currRow.length; col++) {
          if (currRow[col]) {
            const color = COLORS[sprite2[row][col]];
            c.fillStyle = color;
            c.fillRect(x + col, y + currY, 1, 1);
          }
        }
        currY += 1;
      }
    });
    c.drawImage(spritesImg, 0, 0, 128, 128);
    spritesImg.src = spritesCanvas.toDataURL();
  }
  function sprite(n, x, y, w = 1, h = 1) {
    if (n < 0 || n > 255) {
      console.error(`Sprite ${n} is out of range`);
      return;
    }
    const sx = n % 16 * 8;
    const sy = Math.floor(n / 16) * 8;
    const sWidth = w * 8;
    const sHeight = h * 8;
    ctx2.save();
    ctx2.drawImage(
      spritesImg,
      sx,
      // sx of the section of the sprite sheet
      sy,
      // sy of the section of the sprite sheet
      sWidth,
      // sWidth of the section of the sprite sheet
      sHeight,
      // sHeight of the section of the sprite sheet
      x,
      // dx position in the canvas
      y,
      // dy position in the canvas
      sWidth,
      // scaled width of the sprite
      sHeight
    );
    ctx2.restore();
  }
  function text(str, posX, posY, color = 6) {
    ctx2.save();
    if (color !== 6)
      ctx2.fillStyle = COLORS[color];
    let needed = [];
    str = str.toUpperCase();
    for (let i = 0; i < str.length; i++) {
      let char = engineChars[str.charAt(i)];
      if (char)
        needed.push(char);
    }
    let currX = 0;
    for (let i = 0; i < needed.length; i++) {
      let char = needed[i];
      let currY = 0;
      let addX = 0;
      for (let y = 0; y < char.length; y++) {
        let row = char[y];
        for (let x = 0; x < row.length; x++) {
          if (row[x])
            ctx2.fillRect(posX + currX + x, posY + currY, 1, 1);
        }
        addX = Math.max(addX, row.length);
        currY += 1;
      }
      currX += 1 + addX;
    }
    ctx2.restore();
  }

  // src/engineMenu.js
  var menuState = {
    DISABLED: "disabled",
    MAIN: "main",
    OPTIONS: "options"
  };
  var menuItems = [];
  var currentMenuState = {
    state: menuState.DISABLED,
    index: 0
  };
  function handle() {
    switch (currentMenuState.state) {
      case menuState.DISABLED:
        engineCurrentState = engineState.PAUSED;
        paused = true;
        currentMenuState.state = menuState.MAIN;
        menuItems = ["continue", "options", "reset game"];
        break;
      case menuState.MAIN:
        switch (currentMenuState.index) {
          case 0:
            currentMenuState.state = menuState.DISABLED;
            engineCurrentState = engineState.PLAYING;
            paused = false;
            break;
          case 1:
            currentMenuState.state = menuState.OPTIONS;
            currentMenuState.index = 0;
            menuItems = [soundOn ? "sound: on" : "sound: off", `volume: ${printVolume()}`, "back"];
            break;
        }
        break;
      case menuState.OPTIONS:
        switch (currentMenuState.index) {
          case 0:
            soundOn = !soundOn;
            menuItems[0] = soundOn ? "sound: on" : "sound: off";
            break;
          case 2:
            currentMenuState.state = menuState.MAIN;
            currentMenuState.index = 0;
            menuItems = ["continue", "options", "reset game"];
            break;
        }
        break;
    }
  }
  function draw() {
    rectfill(23, 43, 80, 36, 0);
    rect(23, 43, 80, 36, 7);
    print("~", 27, 50 + currentMenuState.index * 8, 7);
    let y = 0;
    menuItems.forEach((item) => {
      let x = 0;
      if (currentMenuState.index === y)
        x = 1;
      print(item, 32 + x, 50 + y * 8, 7);
      y += 1;
    });
  }
  function update() {
    if (keyWasPressed(2)) {
      currentMenuState.index -= 1;
      if (currentMenuState.index < 0)
        currentMenuState.index = menuItems.length - 1;
    }
    if (keyWasPressed(3)) {
      currentMenuState.index += 1;
      if (currentMenuState.index >= menuItems.length)
        currentMenuState.index = 0;
    }
    if (currentMenuState.state === menuState.OPTIONS && currentMenuState.index === 1) {
      if (keyWasPressed(0))
        volume = Math.max(0, volume - 1);
      if (keyWasPressed(1))
        volume = Math.min(8, volume + 1);
      menuItems[1] = `volume: ${printVolume()}`;
    }
  }
  function printVolume() {
    return "0".repeat(volume) + "-".repeat(8 - volume);
  }

  // src/engineInput.js
  function keyIsDown(b) {
    return !!(buttons[b] & 1);
  }
  function clearInput() {
    buttons = [0, 0, 0, 0, 0];
  }
  var buttons = [0, 0, 0, 0, 0];
  function update2() {
    if (!document.hasFocus()) {
      clearInput();
    }
  }
  function updatePost() {
    for (const b in buttons)
      buttons[b] &= 1;
  }
  function init2() {
    onkeydown = (e) => {
      if (!e.repeat) {
        switch (e.code) {
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
            handle();
            break;
        }
      }
      e.preventDefault();
    };
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
    };
    onblur = (e) => clearInput();
  }

  // src/engine.js
  var frameRate = 60;
  var frameTimeLastMS = 0;
  var frameTimeBufferMS = 0;
  var averageFPS = 0;
  var engineState2 = {
    PLAYING: "playing",
    PAUSED: "paused",
    MENU: "menu",
    RESET: "reset"
  };
  var paused2 = false;
  var engineCurrentState2 = engineState2.PLAYING;
  var previousTime = performance.now();
  function clamp(value, min = 0, max = 1) {
    return value < min ? min : value > max ? max : value;
  }
  function lerp(percent, valueA, valueB) {
    return valueA + clamp(percent) * (valueB - valueA);
  }
  function init3(_update, _draw, sprites) {
    const rootElement = document.getElementById("game");
    init(rootElement);
    function gameLoop(frameTimeMS = 0) {
      const frameTimeDeltaMS = frameTimeMS - frameTimeLastMS;
      frameTimeLastMS = frameTimeMS;
      averageFPS = lerp(0.05, averageFPS, 1e3 / (frameTimeDeltaMS || 1));
      frameTimeBufferMS += paused2 ? 0 : frameTimeDeltaMS;
      if (paused2) {
        update2();
        update();
        updatePost();
      } else {
        let deltaSmooth = 0;
        if (frameTimeBufferMS < 0 && frameTimeBufferMS > -9) {
          deltaSmooth = frameTimeBufferMS;
          frameTimeBufferMS = 0;
        }
        for (; frameTimeBufferMS >= 0; frameTimeBufferMS -= 1e3 / frameRate) {
          update2();
          _update();
          updatePost();
        }
        frameTimeBufferMS += deltaSmooth;
      }
      _draw();
      print(`FPS: ${Math.floor(averageFPS)}`, 0, 0);
      if (paused2) draw();
      requestAnimationFrame(gameLoop);
    }
    init2();
    drawSprites(sprites);
    requestAnimationFrame(gameLoop);
  }

  // src/engineApi.js
  function engineInit(update3, draw2, sprites) {
    init3(update3, draw2, sprites);
  }
  function cls(color = 0) {
    clearScreen(color);
  }
  function circ(x, y, radius, color = 6) {
    circle(x, y, radius, COLORS[color]);
  }
  function circfill(x, y, radius, color = 6) {
    circle(x, y, radius, COLORS[color], true);
  }
  function line2(x0, y0, x1, y1, color = 6) {
    line(x0, y0, x1, y1, color);
  }
  function spr(n, x, y, w = 1, h = 1) {
    sprite(n, x, y, w, h);
  }
  function print2(str, posX, posY, color = 6) {
    text(str, posX, posY, color);
  }
  function btn(b) {
    return !paused2 && keyIsDown(b);
  }

  // index.js
  for (const key in engineApi_exports) {
    window[key] = engineApi_exports[key];
  }
})();
