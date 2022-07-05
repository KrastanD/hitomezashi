import { drawPattern } from "./pattern";
import { PatternProps, Sequence, Stroke } from "./types";
import { isColor } from "./utils";

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

sequenceInput.oninput = function (event) {
  const { value } = event.target as HTMLInputElement;
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
        sequence: value ? value : "1",
        sequenceType: sequenceType,
      },
    };
    drawPattern({ horizontalOptions: options });
  }
};

sequenceSelect.oninput = function (event) {
  const { value } = event.target as HTMLSelectElement;
  sequenceType = Number(value) as Sequence;
  if (sequenceType === Sequence.Random) {
    sequenceInput.value = "";
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
};

checkbox.oninput = function (event) {
  const { checked } = event.target as HTMLInputElement;
  options = {
    ...options,
    sequenceOptions: {
      isSequenceVisible: checked,
      sequence: options.sequenceOptions.sequence,
      sequenceType: options.sequenceOptions.sequenceType,
    },
  };
  drawPattern({ horizontalOptions: options });
};

strokeInput.oninput = function (event) {
  const { value } = event.target as HTMLInputElement;
  if (isColor(value)) {
    options = {
      ...options,
      strokeOptions: {
        stroke: options.strokeOptions.stroke,
        color: value,
      },
    };
    drawPattern({ horizontalOptions: options });
  }
};

strokeSelect.oninput = function (event) {
  const { value } = event.target as HTMLSelectElement;
  const strokeType = Number(value) as Stroke;
  if (strokeType === Stroke.Random || strokeType === Stroke.Rainbow) {
    strokeInput.value = "";
    strokeInput.style.display = "none";
  } else {
    strokeInput.style.display = "block";
    strokeInput.title = "HTML color or hex code";
  }
  strokeInput.value = "";
  options = {
    ...options,
    strokeOptions: {
      stroke: strokeType,
    },
  };
  drawPattern({ horizontalOptions: options });
};
