import { drawPattern } from "./pattern.js";
import "./sidebar.js";
import "./horizontal.js";
import "./vertical.js";
import "./background.js";

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
