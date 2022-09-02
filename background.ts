import { drawPattern } from "./pattern.js";
import { getUrlParam, insertUrlParam, isColor } from "./utils.js";

const backgroundInput = document.forms[0][
  "backgroundInput"
] as HTMLInputElement;

const background = getUrlParam("background");
if (isColor(background)) {
  backgroundInput.value = background;
}

backgroundInput.addEventListener("input", function (e: Event) {
  const { value } = e.target as HTMLInputElement;
  if (isColor(value)) {
    insertUrlParam("background", value);
    drawPattern({ backgroundOptions: { color: value } });
  }
});
