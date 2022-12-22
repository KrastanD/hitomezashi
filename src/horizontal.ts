import initCanvas from "./initCanvas.js";
import { Sequence, Stroke } from "./types.js";
import {
  convertBooleanUrlParam,
  getUrlParam,
  insertUrlParam,
  isColor,
  removeUrlParam,
} from "./utils.js";

const sequenceInput = document.forms[0][
  "horizontalSequence"
] as HTMLInputElement;
const sequenceSelect = document.forms[0][
  "horizontalSelect"
] as HTMLSelectElement;
const checkbox = document.forms[0]["horizontalCheckbox"] as HTMLInputElement;
const strokeSelect = document.forms[0][
  "horizontalStrokeSelect"
] as HTMLSelectElement;
const strokeInput = document.forms[0][
  "horizontalStrokeInput"
] as HTMLInputElement;

if (!globalThis.canvas) {
  initCanvas();
}

let sequenceType = Number(sequenceSelect.value);

const hSeq = getUrlParam("hSeq");
if (hSeq) {
  sequenceInput.value = hSeq;
  setSequenceInput(hSeq);
}

sequenceInput.addEventListener("input", (e: Event) => {
  const { value } = e.target as HTMLInputElement;
  insertUrlParam("hSeq", encodeURIComponent(value));
  setSequenceInput(value);
});

function setSequenceInput(sequenceInputValue: string) {
  switch (sequenceType) {
    case Sequence.Binary:
      sequenceInput.title = "1s and 0s only";
      sequenceInput.pattern = "^[01]*$";
      break;
    case Sequence.DecimalToBinary:
    case Sequence.DecimalParity:
      sequenceInput.title = "0-9 only";
      sequenceInput.pattern = "^[0-9]*$";
      break;
    case Sequence.AlphabetParity:
    case Sequence.AlphabetToBinary:
      sequenceInput.title = "Letters only";
      sequenceInput.pattern = "^[a-zA-Z]*$";
      break;
  }
  if (sequenceInput.reportValidity()) {
    globalThis.canvas.getHorizontalPattern().setSequence(sequenceInputValue);
    globalThis.canvas.draw();
  }
}

const hSeqType = getUrlParam("hSeqType");
if (hSeqType) {
  sequenceSelect.value = hSeqType;
  setSequenceType(hSeqType);
}

sequenceSelect.addEventListener("input", (e: Event) => {
  const { value } = e.target as HTMLSelectElement;
  insertUrlParam("hSeqType", encodeURIComponent(value));
  setSequenceType(value);
  sequenceInput.value = "";
  removeUrlParam("hSeq");
});

function setSequenceType(sequenceTypeValue: string) {
  sequenceType = Number(sequenceTypeValue) as Sequence;
  if (sequenceType === Sequence.Random) {
    sequenceInput.style.display = "none";
    globalThis.canvas.getHorizontalPattern().setSequence("");
    globalThis.canvas.getHorizontalPattern().setSequenceType(Sequence.Random);
    globalThis.canvas.draw();
  } else {
    sequenceInput.style.display = "block";
  }
}

const hLegend = getUrlParam("hLegend");
if (hLegend) {
  checkbox.checked = convertBooleanUrlParam(hLegend);
  setLegend(convertBooleanUrlParam(hLegend));
}

checkbox.addEventListener("input", (e: Event) => {
  const { checked } = e.target as HTMLInputElement;
  insertUrlParam("hLegend", encodeURIComponent(checked));
  setLegend(checked);
});

function setLegend(checked: boolean) {
  globalThis.canvas.getHorizontalPattern().setIsSequenceVisible(checked);
  globalThis.canvas.draw();
}

const hStroke = getUrlParam("hStroke");
if (hStroke) {
  strokeInput.value = hStroke;
  setStrokeInput(hStroke);
}

strokeInput.addEventListener("input", (e: Event) => {
  const { value } = e.target as HTMLSelectElement;
  insertUrlParam("hStroke", encodeURIComponent(value));
  setStrokeInput(value);
});

function setStrokeInput(strokeInputValue: string) {
  if (isColor(strokeInputValue)) {
    globalThis.canvas.getHorizontalPattern().setStrokeColor(strokeInputValue);
    globalThis.canvas.draw();
  }
}

const hStrokeType = getUrlParam("hStrokeType");
if (hStrokeType) {
  strokeSelect.value = hStrokeType;
  setStrokeType(Number(hStrokeType));
}

strokeSelect.addEventListener("input", (e: Event) => {
  const { value } = e.target as HTMLSelectElement;
  insertUrlParam("hStrokeType", encodeURIComponent(value));
  setStrokeType(Number(value));
});

function setStrokeType(strokeType: Stroke) {
  if (strokeType === Stroke.Random || strokeType === Stroke.Rainbow) {
    strokeInput.style.display = "none";
  } else {
    strokeInput.style.display = "block";
    strokeInput.title = "HTML color or hex code";
  }
  globalThis.canvas.getHorizontalPattern().setStroke(strokeType);
  globalThis.canvas.draw();
}
