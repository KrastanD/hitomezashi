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
  for (let index = 0; index < width / 2; index += 1) {
    ctx.strokeStyle = "hsla(" + Math.round(index * 2.5) + ", 100%, 50%, 1.0)";
    ctx.beginPath();
    const randomNumber = Math.round(Math.random() * 10);
    ctx.fillText(`${isEven(randomNumber) ? 1 : 0}`, 0, index * 10 + 12);
    if (isEven(randomNumber)) {
      for (let i = 0; i < width; i += 20) {
        ctx.moveTo(i + 10, index * 10 + 10);
        ctx.lineTo(i + 20, index * 10 + 10);
      }
    } else {
      for (let i = 10; i < width; i += 20) {
        ctx.moveTo(i + 10, index * 10 + 10);
        ctx.lineTo(i + 20, index * 10 + 10);
      }
    }
    ctx.stroke();
  }

  for (let index = 0; index < height / 2; index += 1) {
    ctx.strokeStyle = "hsla(" + Math.round(index * 1.5) + ", 100%, 50%, 1.0)";
    ctx.beginPath();
    const randomNumber = Math.round(Math.random() * 10);
    ctx.fillText(`${isEven(randomNumber) ? 1 : 0}`, index * 10 + 8, 8);
    if (isEven(randomNumber)) {
      for (let i = 0; i < height; i += 20) {
        ctx.moveTo(index * 10 + 10, i + 10);
        ctx.lineTo(index * 10 + 10, i + 20);
      }
    } else {
      for (let i = 10; i < height; i += 20) {
        ctx.moveTo(index * 10 + 10, i + 10);
        ctx.lineTo(index * 10 + 10, i + 20);
      }
    }
    ctx.stroke();
  }
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
