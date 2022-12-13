import { drawPattern } from "./src/pattern.js";
import "./src/sidebar.js";
import "./src/horizontal.js";
import "./src/vertical.js";
import "./src/background.js";

function resizeCanvas() {
  const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
  canvas.width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  canvas.height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  drawPattern();
}

resizeCanvas();

document.body.onresize = resizeCanvas;
