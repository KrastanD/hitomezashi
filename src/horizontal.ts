import { drawPattern } from "./pattern.js";
import { PatternProps, Sequence, Stroke } from "./types.js";
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

let sequenceType = Number(sequenceSelect.value);
let options: PatternProps = {
  sequenceOptions: {
    isSequenceVisible: true,
    sequenceType: Sequence.Random,
    sequence: "",
  },
  strokeOptions: { stroke: Stroke.Rainbow },
};

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
    options = {
      ...options,
      sequenceOptions: {
        isSequenceVisible: options.sequenceOptions.isSequenceVisible,
        sequence: sequenceInputValue,
        sequenceType: sequenceType,
      },
    };
    drawPattern({ horizontalOptions: options });
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
});

function setSequenceType(sequenceTypeValue: string) {
  sequenceType = Number(sequenceTypeValue) as Sequence;
  if (sequenceType === Sequence.Random) {
    sequenceInput.style.display = "none";
    options = {
      ...options,
      sequenceOptions: {
        isSequenceVisible: options.sequenceOptions.isSequenceVisible,
        sequence: "",
        sequenceType: Sequence.Random,
      },
    };
    drawPattern({ horizontalOptions: options });
  } else {
    sequenceInput.style.display = "block";
  }
  sequenceInput.value = "";
  removeUrlParam("hSeq");
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
  options = {
    ...options,
    sequenceOptions: {
      isSequenceVisible: checked,
      sequence: options.sequenceOptions.sequence,
      sequenceType: options.sequenceOptions.sequenceType,
    },
  };
  drawPattern({ horizontalOptions: options });
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
    options = {
      ...options,
      strokeOptions: {
        stroke: options.strokeOptions.stroke,
        color: strokeInputValue,
      },
    };
    drawPattern({ horizontalOptions: options });
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
  options = {
    ...options,
    strokeOptions: {
      stroke: strokeType,
    },
  };
  drawPattern({ horizontalOptions: options });
}
