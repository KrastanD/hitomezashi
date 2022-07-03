import { drawPattern, drawVerticalPattern } from "./pattern";
import { DrawPatternProps, Sequence, Stroke } from "./types";
import { isColor } from "./utils";

const sidebarHorizontalSeqInput = document.forms[0][
  "horizontalSequence"
] as HTMLInputElement;
const sidebarHorizontalSeqSelect = document.forms[0][
  "horizontalSelect"
] as HTMLSelectElement;
const horizontalCheckbox = document.forms[0][
  "horizontalCheckbox"
] as HTMLInputElement;
const horizontalStrokeSelect = document.forms[0][
  "horizontalStrokeSelect"
] as HTMLSelectElement;
const horizontalStrokeInput = document.forms[0][
  "horizontalStrokeInput"
] as HTMLInputElement;

let horizontalSequenceType = Number(sidebarHorizontalSeqSelect.value);
let drawProps: DrawPatternProps = {
  sequenceOptions: {
    isSequenceVisible: true,
    sequenceType: Sequence.Random,
    sequence: "",
  },
  strokeOptions: { stroke: Stroke.Rainbow },
};

sidebarHorizontalSeqInput.oninput = function (event) {
  const { value } = event.target as HTMLInputElement;
  switch (horizontalSequenceType) {
    case Sequence.Binary:
      sidebarHorizontalSeqInput.title = "1s and 0s only";
      sidebarHorizontalSeqInput.pattern = "^[01]*$";
      break;
    case Sequence.DecimalToBinary:
    case Sequence.DecimalParity:
      sidebarHorizontalSeqInput.title = "0-9 only";
      sidebarHorizontalSeqInput.pattern = "^[0-9]*$";
      break;
    case Sequence.AlphabetParity:
    case Sequence.AlphabetToBinary:
      sidebarHorizontalSeqInput.title = "Letters only";
      sidebarHorizontalSeqInput.pattern = "^[a-zA-Z]*$";
      break;
  }
  if (sidebarHorizontalSeqInput.reportValidity()) {
    drawProps = {
      ...drawProps,
      sequenceOptions: {
        isSequenceVisible: drawProps.sequenceOptions.isSequenceVisible,
        sequence: value ? value : "1",
        sequenceType: horizontalSequenceType,
      },
    };
    drawPattern(null, drawProps);
  }
};

sidebarHorizontalSeqSelect.oninput = function (event) {
  const { value } = event.target as HTMLSelectElement;
  const sequenceType = Number(value) as Sequence;
  horizontalSequenceType = sequenceType;
  if (sequenceType === Sequence.Random) {
    sidebarHorizontalSeqInput.value = "";
    sidebarHorizontalSeqInput.style.display = "none";
    drawProps = {
      ...drawProps,
      sequenceOptions: {
        isSequenceVisible: drawProps.sequenceOptions.isSequenceVisible,
        sequence: "",
        sequenceType: Sequence.Random,
      },
    };
    drawPattern(null, drawProps);
  } else {
    sidebarHorizontalSeqInput.style.display = "block";
  }
};

horizontalCheckbox.oninput = function (event) {
  const { checked } = event.target as HTMLInputElement;
  drawProps = {
    ...drawProps,
    sequenceOptions: {
      isSequenceVisible: checked,
      sequence: drawProps.sequenceOptions.sequence,
      sequenceType: drawProps.sequenceOptions.sequenceType,
    },
  };
  drawPattern(null, drawProps);
};

horizontalStrokeInput.oninput = function (event) {
  const { value } = event.target as HTMLInputElement;
  if (isColor(value)) {
    drawProps = {
      ...drawProps,
      strokeOptions: {
        stroke: drawProps.strokeOptions.stroke,
        color: value,
      },
    };
    drawPattern(null, drawProps);
  }
};

horizontalStrokeSelect.oninput = function (event) {
  const { value } = event.target as HTMLSelectElement;
  const strokeType = Number(value) as Stroke;
  if (strokeType === Stroke.Random || strokeType === Stroke.Rainbow) {
    horizontalStrokeInput.value = "";
    horizontalStrokeInput.style.display = "none";
  } else {
    horizontalStrokeInput.style.display = "block";
    horizontalStrokeInput.title = "HTML color or hex code";
  }
  horizontalStrokeInput.value = "";
  drawProps = {
    ...drawProps,
    strokeOptions: {
      stroke: strokeType,
    },
  };
  drawPattern(null, drawProps);
};
