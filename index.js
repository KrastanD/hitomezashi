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

  for (let index = 0; index < width / 2; index += 1) {
    console.log(Math.round(index * 2));
    ctx.strokeStyle = "hsla(" + Math.round(index * 2.5) + ", 100%, 50%, 1.0)";
    ctx.beginPath();
    ctx.moveTo(0, index * 10);
    if (isEven(Math.round(Math.random() * 10))) {
      //0 to 10, 20 to 30, 40 to 50, 60 to 70, 80 to 90
      for (let i = 0; i < width; i += 20) {
        ctx.moveTo(i, index * 10);
        ctx.lineTo(i + 10, index * 10);
      }
    } else {
      //10 to 20, 30 to 40, 50 to 60, 70 to 80, 90 to 100
      for (let i = 10; i < width; i += 20) {
        ctx.moveTo(i, index * 10);
        ctx.lineTo(i + 10, index * 10);
      }
    }
    ctx.stroke();
  }

  for (let index = 0; index < height / 2; index += 1) {
    ctx.strokeStyle = "hsla(" + Math.round(index * 1.5) + ", 100%, 50%, 1.0)";
    ctx.beginPath();
    ctx.moveTo(index * 10, 0);
    if (isEven(Math.round(Math.random() * 10))) {
      //0 to 5, 10 to 15, 20 to 25, 30 to 35, 40 to 45, 50 to 55
      for (let i = 0; i < height; i += 20) {
        ctx.moveTo(index * 10, i);
        ctx.lineTo(index * 10, i + 10);
      }
    } else {
      //5 to 10, 15 to 20, 25 to 30, 35 to 40, 45 to 50, 55 to 60
      for (let i = 10; i < height; i += 20) {
        ctx.moveTo(index * 10, i);
        ctx.lineTo(index * 10, i + 10);
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
