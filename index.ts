import { drawPattern } from "./pattern";
import { DrawPatternProps, Sequence, Stroke } from "./types";
import { isColor } from "./utils";

let ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  sidebar: HTMLDivElement,
  sidebarOpenButton: HTMLSpanElement,
  sidebarCloseButton: HTMLSpanElement,
  sidebarHorizontalSeqInput: HTMLInputElement,
  sidebarVerticalSeqInput: HTMLInputElement,
  sidebarHorizontalSeqSelect: HTMLSelectElement,
  sidebarVerticalSeqSelect: HTMLSelectElement,
  horizontalSequenceType: Sequence,
  verticalSequenceType: Sequence,
  horizontalCheckbox: HTMLInputElement,
  verticalCheckbox: HTMLInputElement,
  verticalStrokeSelect: HTMLSelectElement,
  verticalStrokeInput: HTMLInputElement,
  verticalStrokeType: Stroke,
  horizontalStrokeSelect: HTMLSelectElement,
  horizontalStrokeInput: HTMLInputElement,
  horizontalStrokeType: Stroke;

(function () {
  canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
  ctx = canvas.getContext("2d");
  sidebar = document.getElementById("mySidebar") as HTMLDivElement;
  sidebarOpenButton = document.getElementById(
    "sidebarOpenButton"
  ) as HTMLSpanElement;
  sidebarCloseButton = document.getElementById(
    "sidebarCloseButton"
  ) as HTMLSpanElement;
  sidebarHorizontalSeqInput = document.forms[0][
    "horizontalSequence"
  ] as HTMLInputElement;
  sidebarVerticalSeqInput = document.forms[0][
    "verticalSequence"
  ] as HTMLInputElement;
  sidebarHorizontalSeqSelect = document.forms[0][
    "horizontalSelect"
  ] as HTMLSelectElement;
  sidebarVerticalSeqSelect = document.forms[0][
    "verticalSelect"
  ] as HTMLSelectElement;
  horizontalCheckbox = document.forms[0][
    "horizontalCheckbox"
  ] as HTMLInputElement;
  verticalCheckbox = document.forms[0]["verticalCheckbox"] as HTMLInputElement;
  verticalStrokeSelect = document.forms[0][
    "verticalStrokeSelect"
  ] as HTMLSelectElement;
  verticalStrokeInput = document.forms[0][
    "verticalStrokeInput"
  ] as HTMLInputElement;
  horizontalStrokeSelect = document.forms[0][
    "horizontalStrokeSelect"
  ] as HTMLSelectElement;
  horizontalStrokeInput = document.forms[0][
    "horizontalStrokeInput"
  ] as HTMLInputElement;

  horizontalSequenceType = Number(sidebarHorizontalSeqSelect.value);
  verticalSequenceType = Number(sidebarVerticalSeqSelect.value);
  horizontalStrokeType = Number(horizontalStrokeSelect.value);
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

drawPattern({ canvas, ctx }, horizontalProps, verticalProps);

sidebarOpenButton.onclick = function openNav() {
  document.getElementById("mySidebar").classList.add("sidebar-open");
  canvas.classList.add("canvas-sidebar-open");
};

sidebarCloseButton.onclick = function closeNav() {
  document.getElementById("mySidebar").classList.remove("sidebar-open");
  canvas.classList.remove("canvas-sidebar-open");
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
    horizontalProps = {
      ...horizontalProps,
      sequenceOptions: {
        isSequenceVisible: horizontalProps.sequenceOptions.isSequenceVisible,
        sequence: value ? value : "1",
        sequenceType: verticalSequenceType,
      },
    };
    drawPattern({ canvas, ctx }, horizontalProps, verticalProps);
  }
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
    verticalProps = {
      ...verticalProps,
      sequenceOptions: {
        isSequenceVisible: verticalProps.sequenceOptions.isSequenceVisible,
        sequence: value ? value : "1",
        sequenceType: horizontalSequenceType,
      },
    };
    drawPattern({ canvas, ctx }, horizontalProps, verticalProps);
  }
};

sidebarHorizontalSeqSelect.oninput = function (event) {
  const { value } = event.target as HTMLSelectElement;
  const sequenceType = Number(value) as Sequence;
  horizontalSequenceType = sequenceType;
  if (sequenceType === Sequence.Random) {
    sidebarHorizontalSeqInput.value = "";
    sidebarHorizontalSeqInput.style.display = "none";
    verticalProps = {
      ...verticalProps,
      sequenceOptions: {
        isSequenceVisible: verticalProps.sequenceOptions.isSequenceVisible,
        sequence: "",
        sequenceType: Sequence.Random,
      },
    };
    drawPattern({ canvas, ctx }, horizontalProps, verticalProps);
  } else {
    sidebarHorizontalSeqInput.style.display = "block";
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
    drawPattern({ canvas, ctx }, horizontalProps, verticalProps);
  } else {
    sidebarVerticalSeqInput.style.display = "block";
  }
  sidebarVerticalSeqInput.value = "";
  drawPattern({ canvas, ctx }, horizontalProps, verticalProps);
};

horizontalCheckbox.oninput = function (event) {
  const { checked } = event.target as HTMLInputElement;
  verticalProps = {
    ...verticalProps,
    sequenceOptions: {
      isSequenceVisible: checked,
      sequence: verticalProps.sequenceOptions.sequence,
      sequenceType: verticalProps.sequenceOptions.sequenceType,
    },
  };
  drawPattern({ canvas, ctx }, horizontalProps, verticalProps);
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
  drawPattern({ canvas, ctx }, horizontalProps, verticalProps);
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
    drawPattern({ canvas, ctx }, horizontalProps, verticalProps);
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
  drawPattern({ canvas, ctx }, horizontalProps, verticalProps);
};

horizontalStrokeInput.oninput = function (event) {
  const { value } = event.target as HTMLInputElement;
  if (isColor(value)) {
    verticalProps = {
      ...verticalProps,
      strokeOptions: {
        stroke: verticalProps.strokeOptions.stroke,
        color: value,
      },
    };
    drawPattern({ canvas, ctx }, horizontalProps, verticalProps);
  }
};

horizontalStrokeSelect.oninput = function (event) {
  const { value } = event.target as HTMLSelectElement;
  const strokeType = Number(value) as Stroke;
  horizontalStrokeType = strokeType;
  if (strokeType === Stroke.Random || strokeType === Stroke.Rainbow) {
    horizontalStrokeInput.value = "";
    horizontalStrokeInput.style.display = "none";
  } else {
    horizontalStrokeInput.style.display = "block";
    horizontalStrokeInput.title = "HTML color or hex code";
  }
  horizontalStrokeInput.value = "";
  verticalProps = {
    ...verticalProps,
    strokeOptions: {
      stroke: strokeType,
    },
  };
  drawPattern({ canvas, ctx }, horizontalProps, verticalProps);
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

  drawPattern({ canvas, ctx }, horizontalProps, verticalProps);
};
