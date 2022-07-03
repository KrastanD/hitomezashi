import { drawPattern } from "./pattern";
import { DrawPatternProps, Sequence, Stroke } from "./types";
import { isColor } from "./utils";

const sidebarVerticalSeqInput = document.forms[0][
  "verticalSequence"
] as HTMLInputElement;

const sidebarVerticalSeqSelect = document.forms[0][
  "verticalSelect"
] as HTMLSelectElement;

const verticalCheckbox = document.forms[0][
  "verticalCheckbox"
] as HTMLInputElement;
const verticalStrokeSelect = document.forms[0][
  "verticalStrokeSelect"
] as HTMLSelectElement;
const verticalStrokeInput = document.forms[0][
  "verticalStrokeInput"
] as HTMLInputElement;

let verticalSequenceType = Number(sidebarVerticalSeqSelect.value);
let drawProps: DrawPatternProps = {
  sequenceOptions: {
    isSequenceVisible: true,
    sequenceType: Sequence.Random,
    sequence: "",
  },
  strokeOptions: { stroke: Stroke.Rainbow },
};

sidebarVerticalSeqInput.oninput = function (event) {
  const { value } = event.target as HTMLInputElement;

  switch (verticalSequenceType) {
    case Sequence.Binary:
      sidebarVerticalSeqInput.title = "1s and 0s only";
      sidebarVerticalSeqInput.pattern = "^[01]*$";
      break;
    case Sequence.DecimalToBinary:
    case Sequence.DecimalParity:
      sidebarVerticalSeqInput.title = "0-9 only";
      sidebarVerticalSeqInput.pattern = "^[0-9]*$";
      break;
    case Sequence.AlphabetParity:
    case Sequence.AlphabetToBinary:
      sidebarVerticalSeqInput.title = "Letters only";
      sidebarVerticalSeqInput.pattern = "^[a-zA-Z]*$";
      break;
  }
  if (sidebarVerticalSeqInput.reportValidity()) {
    drawProps = {
      ...drawProps,
      sequenceOptions: {
        isSequenceVisible: drawProps.sequenceOptions.isSequenceVisible,
        sequence: value ? value : "1",
        sequenceType: verticalSequenceType,
      },
    };
    drawPattern(drawProps);
  }
};

sidebarVerticalSeqSelect.oninput = function (event) {
  const { value } = event.target as HTMLSelectElement;
  const sequenceType = Number(value) as Sequence;
  verticalSequenceType = sequenceType;
  if (sequenceType === Sequence.Random) {
    sidebarVerticalSeqInput.value = "";
    sidebarVerticalSeqInput.style.display = "none";
    drawProps = {
      ...drawProps,
      sequenceOptions: {
        isSequenceVisible: drawProps.sequenceOptions.isSequenceVisible,
        sequence: "",
        sequenceType: Sequence.Random,
      },
    };
    drawPattern(drawProps);
  } else {
    sidebarVerticalSeqInput.style.display = "block";
  }
  sidebarVerticalSeqInput.value = "";
  drawPattern(drawProps);
};

verticalCheckbox.oninput = function (event) {
  const { checked } = event.target as HTMLInputElement;
  drawProps = {
    ...drawProps,
    sequenceOptions: {
      isSequenceVisible: checked,
      sequence: drawProps.sequenceOptions.sequence,
      sequenceType: drawProps.sequenceOptions.sequenceType,
    },
  };
  drawPattern(drawProps);
};

verticalStrokeInput.oninput = function (event) {
  const { value } = event.target as HTMLInputElement;
  if (isColor(value)) {
    drawProps = {
      ...drawProps,
      strokeOptions: {
        stroke: drawProps.strokeOptions.stroke,
        color: value,
      },
    };
    drawPattern(drawProps);
  }
};

verticalStrokeSelect.oninput = function (event) {
  const { value } = event.target as HTMLSelectElement;
  const strokeType = Number(value) as Stroke;
  if (strokeType === Stroke.Random || strokeType === Stroke.Rainbow) {
    verticalStrokeInput.value = "";
    verticalStrokeInput.style.display = "none";
  } else {
    verticalStrokeInput.style.display = "block";
    verticalStrokeInput.title = "HTML color or hex code";
  }
  verticalStrokeInput.value = "";
  drawProps = {
    ...drawProps,
    strokeOptions: {
      stroke: strokeType,
    },
  };
  drawPattern(drawProps);
};
