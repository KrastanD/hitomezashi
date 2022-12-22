import Canvas from "./classCanvas.js";
import Pattern from "./classPattern.js";

function initCanvas() {
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

  if (context) {
    globalThis.canvas = new Canvas(
      horizontalPattern,
      verticalPattern,
      context,
      htmlCanvas.width,
      htmlCanvas.height
    );
  }
}

export default initCanvas;
