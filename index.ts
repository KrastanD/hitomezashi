import "./src/sidebar.js";
import "./src/horizontal.js";
import "./src/background.js";
import "./src/vertical.js";
import initCanvas from "./src/initCanvas.js";

function resizeCanvas() {
  const htmlCanvas = document.getElementById("myCanvas") as HTMLCanvasElement;
  const context = htmlCanvas.getContext("2d");
  if (!context) {
    return;
  }

  htmlCanvas.width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  htmlCanvas.height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  if (!globalThis.canvas) {
    initCanvas();
  }

  canvas.setWidth(htmlCanvas.width);
  canvas.setHeight(htmlCanvas.height);

  canvas.draw();
}

resizeCanvas();

document.body.addEventListener("resize", () => resizeCanvas());
