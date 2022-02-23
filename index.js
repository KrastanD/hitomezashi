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
  document.body.style.backgroundColor = "black";
  ctx.font = "8px Arial";

  drawHorizontalPattern({
    isSequenceVisible: false,
    isSequenceRandom: true,
    isRainbow: true,
    color: "#FECA00",
  });
  drawVerticalPattern({
    isSequenceVisible: false,
    isSequenceRandom: true,
    isRainbow: true,
    color: "#FECA00",
  });
}

function drawHorizontalPattern({
  isSequenceVisible,
  isSequenceRandom,
  isRainbow,
  color,
}) {
  for (let index = 10; index < height; index += 10) {
    if (isRainbow) {
      ctx.strokeStyle = "hsla(" + Math.round(index / 1.7) + ", 100%, 50%, 1.0)";
    } else {
      ctx.strokeStyle = color;
    }
    ctx.beginPath();

    const bit = getBit({ isSequenceRandom });
    let startingIndex = bit ? 0 : 10;
    if (isSequenceVisible) {
      ctx.fillText(`${bit}`, 2, index + 2);
      startingIndex += 10;
    }
    for (let i = startingIndex; i < width; i += 20) {
      drawHorizontalLine({ x: i, y: index }, 10);
    }
    ctx.stroke();
  }
}

function drawVerticalPattern({
  isSequenceVisible,
  isSequenceRandom,
  isRainbow,
  color,
}) {
  for (let index = 10; index < width; index += 10) {
    if (isRainbow) {
      ctx.strokeStyle = "hsla(" + Math.round(index / 2.7) + ", 100%, 50%, 1.0)";
    } else {
      ctx.strokeStyle = color;
    }
    ctx.beginPath();
    const bit = getBit({ isSequenceRandom });
    let startingIndex = bit ? 0 : 10;
    if (isSequenceVisible) {
      ctx.fillText(`${bit}`, index - 2, 8);
      startingIndex += 10;
    }
    for (let i = startingIndex; i < height; i += 20) {
      drawVerticalLine({ x: index, y: i }, 10);
    }
    ctx.stroke();
  }
}

function getBit({ isSequenceRandom }) {
  if (isSequenceRandom) {
    return isEven(Math.round(Math.random() * 10)) ? 1 : 0;
  } else {
    return 1;
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
