import initCanvas from "./initCanvas.js";
import { getUrlParam, insertUrlParam, isColor } from "./utils.js";

const backgroundInput = document.forms[0][
  "backgroundInput"
] as HTMLInputElement;

if (!globalThis.canvas) {
  initCanvas();
}

const background = getUrlParam("background");
if (background && isColor(background)) {
  backgroundInput.value = background;
}

backgroundInput.addEventListener("input", function (e: Event) {
  const { value } = e.target as HTMLInputElement;
  if (isColor(value)) {
    insertUrlParam("background", value);
    globalThis.canvas.setBackgroundColor(value);
    globalThis.canvas.draw();
  }
});
