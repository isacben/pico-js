const colors = ["white", "green", "red"];

var canvas = document.createElement('canvas');

canvas.width = 720;
canvas.height = 720;
canvas.style.zIndex = 8;
canvas.style.position = "absolute";
canvas.style.border = "1px solid";

var body = document.getElementsByTagName("body")[0];
body.appendChild(canvas);

var ctx = canvas.getContext("2d");

window.requestAnimationFrame(gameLoop);

function gameLoop(timestamp) {
    _update();
    _draw();

    window.requestAnimationFrame(gameLoop);
}

//function init(update) {
//    update();
//}
//init(_update);



// API

function cls() {
    rect(0, 0, canvas.width, canvas.height, 0);
}

function rect(x, y, w, h, c) {
    ctx.fillStyle = colors[c];
    ctx.fillRect(x, y, w, h);
}

function print(s, x, y, c) {
    ctx.fillStyle = colors[c];
    ctx.fillText(s, x, y, 200);
}