let width, height, ctx;
(function () {
  const canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");

  canvas.width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  canvas.height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  width = canvas.width;
  height = canvas.height;
})();

drawPattern();

function drawPattern() {
  ctx.moveTo(0, 0);
  ctx.fillStyle = "white";
  ctx.font = "8px Arial";

  drawHorizontalPattern();
  drawVerticalPattern();
}

function drawHorizontalPattern() {
  for (let index = 10; index < height; index += 10) {
    ctx.strokeStyle = "hsla(" + Math.round(index / 1.5) + ", 100%, 50%, 1.0)";
    ctx.beginPath();
    const randomNumber = Math.round(Math.random() * 10);
    ctx.fillText(`${isEven(randomNumber) ? 1 : 0}`, 0, index + 2);
    const startingIndex = isEven(randomNumber) ? 10 : 20;
    for (let i = startingIndex; i < width; i += 20) {
      drawHorizontalLine({ x: i, y: index }, 10);
    }
    ctx.stroke();
  }
}

function drawVerticalPattern() {
  for (let index = 10; index < width; index += 10) {
    ctx.strokeStyle = "hsla(" + Math.round(index / 2.5) + ", 100%, 50%, 1.0)";
    ctx.beginPath();
    const randomNumber = Math.round(Math.random() * 10);
    ctx.fillText(`${isEven(randomNumber) ? 1 : 0}`, index - 2, 8);
    const startingIndex = isEven(randomNumber) ? 10 : 20;
    for (let i = startingIndex; i < height; i += 20) {
      drawVerticalLine({ x: index, y: i }, 10);
    }
    ctx.stroke();
  }
}

function drawHorizontalLine({ x, y }, distance) {
  ctx.moveTo(x, y);
  ctx.lineTo(x + distance, y);
}

function drawVerticalLine({ x, y }, distance) {
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + distance);
}

function drawGrid() {
  ctx.moveTo(0, 0);
  ctx.strokeStyle = "orange";
  xPattern.forEach((rowValue, index) => {
    ctx.moveTo(0, index * 10);
    ctx.lineTo(500, index * 10);
  });

  yPattern.forEach((colValue, index) => {
    ctx.moveTo(index * 10, 0);
    ctx.lineTo(index * 10, 500);
  });

  ctx.stroke();
}

function resizeCanvas() {
  canvas.width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  canvas.height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  width = canvas.width;
  height = canvas.height;
}

function isEven(num) {
  return num % 2 === 0;
}
