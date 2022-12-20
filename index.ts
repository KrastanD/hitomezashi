import "./src/sidebar.js";
import "./src/horizontal.js";
import "./src/vertical.js";
import "./src/k.js";
import Pattern from "./src/classPattern.js";
import Canvas from "./src/classCanvas.js";

function resizeCanvas(canvas: Canvas) {
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

  canvas.setWidth(htmlCanvas.width);
  canvas.setHeight(htmlCanvas.height);

  canvas.draw();
}

(() => {
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

  const horizontalPattern = new Pattern();
  const verticalPattern = new Pattern();

  const canvas = new Canvas(
    horizontalPattern,
    verticalPattern,
    context,
    htmlCanvas.width,
    htmlCanvas.height
  );

  canvas.draw();

  document.body.addEventListener("resize", () => resizeCanvas(canvas));
})();
