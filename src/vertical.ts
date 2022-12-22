import initCanvas from "./initCanvas.js";
import { Sequence, Stroke } from "./types.js";
import {
  convertBooleanUrlParam,
  getUrlParam,
  insertUrlParam,
  isColor,
  removeUrlParam,
} from "./utils.js";

if (!globalThis.canvas) {
  initCanvas();
}

const sequenceInput = document.forms[0]["verticalSequence"] as HTMLInputElement;

const sequenceSelect = document.forms[0]["verticalSelect"] as HTMLSelectElement;

const checkbox = document.forms[0]["verticalCheckbox"] as HTMLInputElement;
const strokeSelect = document.forms[0][
  "verticalStrokeSelect"
] as HTMLSelectElement;
const strokeInput = document.forms[0][
  "verticalStrokeInput"
] as HTMLInputElement;

let sequenceType = Number(sequenceSelect.value);

const vSeq = getUrlParam("vSeq");
if (vSeq) {
  sequenceInput.value = vSeq;
  setSequenceInput(vSeq);
}

sequenceInput.addEventListener("input", (e: Event) => {
  const { value } = e.target as HTMLInputElement;
  insertUrlParam("vSeq", encodeURIComponent(value));
  setSequenceInput(value);
});

function setSequenceInput(value: string) {
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
    globalThis.canvas.getVerticalPattern().setSequence(value);
    globalThis.canvas.draw();
  }
}

const vSeqType = getUrlParam("vSeqType");
if (vSeqType) {
  sequenceSelect.value = vSeqType;
  setSequenceType(vSeqType);
}

sequenceSelect.addEventListener("input", (e: Event) => {
  const { value } = e.target as HTMLSelectElement;
  insertUrlParam("vSeqType", encodeURIComponent(value));
  setSequenceType(value);
  sequenceInput.value = "";
  removeUrlParam("vSeq");
});

function setSequenceType(value: string) {
  sequenceType = Number(value) as Sequence;
  if (sequenceType === Sequence.Random) {
    sequenceInput.style.display = "none";
    globalThis.canvas.getVerticalPattern().setSequence("");
    globalThis.canvas.getVerticalPattern().setSequenceType(Sequence.Random);
    globalThis.canvas.draw();
  } else {
    sequenceInput.style.display = "block";
  }
}

const vLegend = getUrlParam("vLegend");
if (vLegend) {
  checkbox.checked = convertBooleanUrlParam(vLegend);
  setLegend(convertBooleanUrlParam(vLegend));
}

checkbox.addEventListener("input", function (e: Event) {
  const { checked } = e.target as HTMLInputElement;
  insertUrlParam("vLegend", encodeURIComponent(checked));
  setLegend(checked);
});

function setLegend(checked: boolean) {
  globalThis.canvas.getVerticalPattern().setIsSequenceVisible(checked);
  globalThis.canvas.draw();
}

const vStroke = getUrlParam("vStroke");
if (vStroke) {
  strokeInput.value = vStroke;
  setStrokeInput(vStroke);
}

strokeInput.addEventListener("input", function (e: Event) {
  const { value } = e.target as HTMLInputElement;
  insertUrlParam("vStroke", encodeURIComponent(value));
  setStrokeInput(value);
});

function setStrokeInput(value: string) {
  if (isColor(value)) {
    globalThis.canvas.getVerticalPattern().setStrokeColor(value);
    globalThis.canvas.draw();
  }
}

const vStrokeType = getUrlParam("vStrokeType");
if (vStrokeType) {
  strokeSelect.value = vStrokeType;
  setStrokeType(Number(vStrokeType));
}

strokeSelect.addEventListener("input", function (e: Event) {
  const { value } = e.target as HTMLSelectElement;
  insertUrlParam("vStrokeType", encodeURIComponent(value));
  setStrokeType(Number(value));
});

function setStrokeType(strokeType: Stroke) {
  if (strokeType === Stroke.Random || strokeType === Stroke.Rainbow) {
    strokeInput.style.display = "none";
  } else {
    strokeInput.style.display = "block";
    strokeInput.title = "HTML color or hex code";
  }
  globalThis.canvas.getVerticalPattern().setStroke(strokeType);
  globalThis.canvas.draw();
}
