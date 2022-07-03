import { drawPattern } from "./pattern";
import { DrawPatternProps, Sequence, Stroke } from "./types";
import { isColor } from "./utils";
import "./sidebar";
import "./horizontal";

let ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  sidebarVerticalSeqInput: HTMLInputElement,
  sidebarVerticalSeqSelect: HTMLSelectElement,
  verticalSequenceType: Sequence,
  verticalCheckbox: HTMLInputElement,
  verticalStrokeSelect: HTMLSelectElement,
  verticalStrokeInput: HTMLInputElement,
  verticalStrokeType: Stroke;

const sidebar = document.getElementById("mySidebar") as HTMLDivElement;

(function () {
  canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
  ctx = canvas.getContext("2d");

  sidebarVerticalSeqInput = document.forms[0][
    "verticalSequence"
  ] as HTMLInputElement;

  sidebarVerticalSeqSelect = document.forms[0][
    "verticalSelect"
  ] as HTMLSelectElement;

  verticalCheckbox = document.forms[0]["verticalCheckbox"] as HTMLInputElement;
  verticalStrokeSelect = document.forms[0][
    "verticalStrokeSelect"
  ] as HTMLSelectElement;
  verticalStrokeInput = document.forms[0][
    "verticalStrokeInput"
  ] as HTMLInputElement;

  verticalSequenceType = Number(sidebarVerticalSeqSelect.value);
  verticalStrokeType = Number(verticalStrokeSelect.value);

  canvas.width =
    (window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth) - sidebar.clientWidth;
  canvas.height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
})();

const defaultDrawPatternProps: DrawPatternProps = {
  sequenceOptions: {
    isSequenceVisible: true,
    sequenceType: Sequence.Random,
    sequence: "",
  },
  strokeOptions: { stroke: Stroke.Rainbow },
};
let horizontalProps = { ...defaultDrawPatternProps };
let verticalProps = { ...defaultDrawPatternProps };

drawPattern(horizontalProps, verticalProps);

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
    horizontalProps = {
      ...horizontalProps,
      sequenceOptions: {
        isSequenceVisible: horizontalProps.sequenceOptions.isSequenceVisible,
        sequence: value ? value : "1",
        sequenceType: verticalSequenceType,
      },
    };
    drawPattern(horizontalProps, verticalProps);
  }
};

sidebarVerticalSeqSelect.oninput = function (event) {
  const { value } = event.target as HTMLSelectElement;
  const sequenceType = Number(value) as Sequence;
  verticalSequenceType = sequenceType;
  if (sequenceType === Sequence.Random) {
    sidebarVerticalSeqInput.value = "";
    sidebarVerticalSeqInput.style.display = "none";
    horizontalProps = {
      ...horizontalProps,
      sequenceOptions: {
        isSequenceVisible: horizontalProps.sequenceOptions.isSequenceVisible,
        sequence: "",
        sequenceType: Sequence.Random,
      },
    };
    drawPattern(horizontalProps, verticalProps);
  } else {
    sidebarVerticalSeqInput.style.display = "block";
  }
  sidebarVerticalSeqInput.value = "";
  drawPattern(horizontalProps, verticalProps);
};

verticalCheckbox.oninput = function (event) {
  const { checked } = event.target as HTMLInputElement;
  horizontalProps = {
    ...horizontalProps,
    sequenceOptions: {
      isSequenceVisible: checked,
      sequence: horizontalProps.sequenceOptions.sequence,
      sequenceType: horizontalProps.sequenceOptions.sequenceType,
    },
  };
  drawPattern(horizontalProps, verticalProps);
};

verticalStrokeInput.oninput = function (event) {
  const { value } = event.target as HTMLInputElement;
  if (isColor(value)) {
    horizontalProps = {
      ...horizontalProps,
      strokeOptions: {
        stroke: horizontalProps.strokeOptions.stroke,
        color: value,
      },
    };
    drawPattern(horizontalProps, verticalProps);
  }
};

verticalStrokeSelect.oninput = function (event) {
  const { value } = event.target as HTMLSelectElement;
  const strokeType = Number(value) as Stroke;
  verticalStrokeType = strokeType;
  if (strokeType === Stroke.Random || strokeType === Stroke.Rainbow) {
    verticalStrokeInput.value = "";
    verticalStrokeInput.style.display = "none";
  } else {
    verticalStrokeInput.style.display = "block";
    verticalStrokeInput.title = "HTML color or hex code";
  }
  verticalStrokeInput.value = "";
  horizontalProps = {
    ...horizontalProps,
    strokeOptions: {
      stroke: strokeType,
    },
  };
  drawPattern(horizontalProps, verticalProps);
};

document.body.onresize = function resizeCanvas() {
  canvas.width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  canvas.height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  drawPattern(horizontalProps, verticalProps);
};
