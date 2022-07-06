import { drawPattern } from "./pattern";
import { isColor } from "./utils";

const backgroundInput = document.forms[0][
  "backgroundInput"
] as HTMLInputElement;

backgroundInput.oninput = function (event) {
  const { value } = event.target as HTMLInputElement;
  if (isColor(value)) {
    drawPattern({ backgroundOptions: { color: value } });
  }
};
