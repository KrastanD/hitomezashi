import { drawPattern } from "./pattern";
import "./sidebar";
import "./horizontal";
import "./vertical";

resizeCanvas();

function resizeCanvas() {
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

document.body.onresize = resizeCanvas;
