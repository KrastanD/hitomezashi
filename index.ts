import { drawPattern } from "./pattern";
import "./sidebar";
import "./horizontal";
import "./vertical";

function resizeCanvas() {
  canvas.width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  canvas.height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  drawPattern({});
}

resizeCanvas();

document.body.onresize = resizeCanvas;
