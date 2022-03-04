import {
  DrawPatternProps,
  GetBitProps,
  Sequence,
  Stroke,
  StrokeOptions,
} from "./types";
import {
  charToBinary,
  decimalToBinary,
  drawHorizontalLine,
  drawVerticalLine,
  isColor,
  isEven,
  isVowel,
} from "./utils";

let width: number,
  height: number,
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  sidebar: HTMLDivElement,
  sidebarOpenButton: HTMLSpanElement,
  sidebarCloseButton: HTMLSpanElement,
  sidebarHorizontalSeqInput: HTMLInputElement,
  sidebarVerticalSeqInput: HTMLInputElement,
  sidebarHorizontalSeqSelect: HTMLSelectElement,
  sidebarVerticalSeqSelect: HTMLSelectElement,
  horizontalSequenceType: number,
  verticalSequenceType: number,
  horizontalCheckbox: HTMLInputElement,
  verticalCheckbox: HTMLInputElement;

const DISTANCE_APART = 15;
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

  horizontalSequenceType = Number(sidebarHorizontalSeqSelect.value);
  verticalSequenceType = Number(sidebarVerticalSeqSelect.value);

  width =
    (window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth) - sidebar.clientWidth;
  height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  canvas.width = width;
  canvas.height = height;
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

drawPattern();

function drawPattern() {
  ctx.moveTo(0, 0);
  ctx.fillStyle = "white";
  document.body.style.backgroundColor = "black";
  ctx.font = "8px Arial";

  drawHorizontalPattern(horizontalProps);
  drawVerticalPattern(verticalProps);
}

function drawHorizontalPattern({
  sequenceOptions: { isSequenceVisible, sequence, sequenceType },
  strokeOptions: { stroke, color },
}: DrawPatternProps) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const sequenceArray = prepareSequence(sequence, sequenceType);
  for (let index = DISTANCE_APART; index < height; index += DISTANCE_APART) {
    setStrokeStyle({ stroke, color }, index);
    ctx.beginPath();

    const bit = getBit({
      sequence: sequenceArray,
      index: index - DISTANCE_APART,
      sequenceType,
    });
    let startingIndex = bit ? 0 : DISTANCE_APART;
    if (isSequenceVisible) {
      ctx.fillText(`${bit}`, 2, index + 2);
      startingIndex += DISTANCE_APART;
    }
    for (let i = startingIndex; i < width; i += 2 * DISTANCE_APART) {
      drawHorizontalLine({ x: i, y: index }, DISTANCE_APART, ctx);
    }
    ctx.stroke();
  }
}

function drawVerticalPattern({
  sequenceOptions: { isSequenceVisible, sequence, sequenceType },
  strokeOptions: { stroke, color },
}: DrawPatternProps) {
  const sequenceArray = prepareSequence(sequence, sequenceType);
  for (let index = DISTANCE_APART; index < width; index += DISTANCE_APART) {
    setStrokeStyle({ stroke, color }, index);
    ctx.beginPath();
    const bit = getBit({
      sequence: sequenceArray,
      index: index - DISTANCE_APART,
      sequenceType,
    });
    let startingIndex = bit ? 0 : DISTANCE_APART;
    if (isSequenceVisible) {
      ctx.fillText(`${bit}`, index - 2, 8);
      startingIndex += DISTANCE_APART;
    }
    for (let i = startingIndex; i < height; i += 2 * DISTANCE_APART) {
      drawVerticalLine({ x: index, y: i }, DISTANCE_APART, ctx);
    }
    ctx.stroke();
  }
}

function getBit({ sequence, index, sequenceType }: GetBitProps): number {
  let sequenceValue: number;

  if (sequenceType !== Sequence.Random) {
    sequenceValue =
      sequence[
        Math.round(Math.round(index / DISTANCE_APART) % sequence.length)
      ];
  }

  switch (sequenceType) {
    case Sequence.Random:
      return isEven(Math.round(Math.random() * DISTANCE_APART)) ? 1 : 0;
    case Sequence.Binary:
    case Sequence.DecimalToBinary:
    case Sequence.AlphabetParity:
    case Sequence.AlphabetToBinary:
      return sequenceValue;
    case Sequence.DecimalParity:
      return isEven(sequenceValue) ? 1 : 0;
    default:
      return 0;
  }
}

function prepareSequence(sequence: string, sequenceType: Sequence): number[] {
  if (sequenceType === Sequence.Random) {
    return;
  }
  const sequenceArray = sequence.split("");

  switch (sequenceType) {
    case Sequence.DecimalToBinary:
      return sequenceArray.reduce((acc: number[], char) => {
        return acc.concat(
          String(decimalToBinary(Number(char)))
            .split("")
            .map((val) => Number(val))
        );
      }, []);
    case Sequence.AlphabetParity: {
      return sequenceArray.map((char) => (isVowel(char) ? 1 : 0));
    }
    case Sequence.AlphabetToBinary: {
      return sequenceArray.reduce((acc: number[], char) => {
        return acc.concat(
          String(charToBinary(char))
            .split("")
            .map((val) => Number(val))
        );
      }, []);
    }
    default:
      return sequenceArray.map((char) => Number(char));
  }
}

sidebarOpenButton.onclick = function openNav() {
  document.getElementById("mySidebar").style.width = "20vw";
  canvas.style.paddingLeft = "20vw";
};

sidebarCloseButton.onclick = function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  canvas.style.paddingLeft = "0";
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
    drawPattern();
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
    drawPattern();
  }
};

sidebarHorizontalSeqSelect.oninput = function (event) {
  const { value } = event.target as HTMLSelectElement;
  const sequenceType = Number(value) as Sequence;
  horizontalSequenceType = sequenceType;
  if (sequenceType === Sequence.Random) {
    sidebarHorizontalSeqInput.value = "";
    sidebarHorizontalSeqInput.disabled = true;
    verticalProps = {
      ...verticalProps,
      sequenceOptions: {
        isSequenceVisible: verticalProps.sequenceOptions.isSequenceVisible,
        sequence: "",
        sequenceType: Sequence.Random,
      },
    };
    drawPattern();
  } else {
    sidebarHorizontalSeqInput.disabled = false;
  }
};

sidebarVerticalSeqSelect.oninput = function (event) {
  const { value } = event.target as HTMLSelectElement;
  const sequenceType = Number(value) as Sequence;
  verticalSequenceType = sequenceType;
  if (sequenceType === Sequence.Random) {
    sidebarVerticalSeqInput.value = "";
    sidebarVerticalSeqInput.disabled = true;
    horizontalProps = {
      ...horizontalProps,
      sequenceOptions: {
        isSequenceVisible: horizontalProps.sequenceOptions.isSequenceVisible,
        sequence: "",
        sequenceType: Sequence.Random,
      },
    };
    drawPattern();
  } else {
    sidebarVerticalSeqInput.disabled = false;
  }
  sidebarVerticalSeqInput.value = "";
  drawPattern();
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
  drawPattern();
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
  drawPattern();
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

  width = canvas.width;
  height = canvas.height;
  drawPattern();
};

function setStrokeStyle({ stroke, color }: StrokeOptions, index: number) {
  switch (stroke) {
    case Stroke.Rainbow:
      ctx.strokeStyle = "hsla(" + Math.round(index / 1.7) + ", 100%, 50%, 1.0)";
      break;
    case Stroke.Random:
      ctx.strokeStyle = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      break;
    case Stroke.Custom:
      if (color && isColor(color)) {
        ctx.strokeStyle = color;
      }
      break;
  }
}
