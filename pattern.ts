import { DISTANCE_APART } from "./constants.js";
import {
  PatternProps,
  GetBitProps,
  Sequence,
  Stroke,
  StrokeOptions,
} from "./types.js";
import {
  charToBinary,
  convertBooleanUrlParam,
  decimalToBinary,
  drawHorizontalLine,
  drawVerticalLine,
  getUrlParam,
  isColor,
  isEven,
  isVowel,
} from "./utils.js";

type DrawPatternProps = {
  verticalOptions?: PatternProps;
  horizontalOptions?: PatternProps;
  backgroundOptions?: { color: string };
};

const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

let defaultProps: PatternProps = {
  sequenceOptions: {
    isSequenceVisible: true,
    sequenceType: Sequence.Random,
    sequence: "",
  },
  strokeOptions: { stroke: Stroke.Rainbow },
};
let horizontalProps = { ...defaultProps };
let verticalProps = { ...defaultProps };
let backgroundProps = { color: "black" };

export function drawPattern({
  verticalOptions,
  horizontalOptions,
  backgroundOptions,
}: DrawPatternProps = {}) {
  if (backgroundOptions?.color) {
    backgroundProps.color = backgroundOptions.color;
  }

  ctx.moveTo(0, 0);
  ctx.fillStyle = "white";
  document.body.style.backgroundColor =
    getUrlParam("background") || backgroundProps.color;

  ctx.font = "8px Arial";

  if (verticalOptions) {
    verticalProps = verticalOptions;
  }

  if (horizontalOptions) {
    horizontalProps = horizontalOptions;
  }
  const hSeqType = getUrlParam("hSeqType");
  if (hSeqType) {
    horizontalProps.sequenceOptions.sequenceType = Number(hSeqType);
  }
  const hSeq = getUrlParam("hSeq");
  if (hSeq) {
    horizontalProps.sequenceOptions.sequence = hSeq;
  }
  const hStroke = getUrlParam("hStroke");
  if (hStroke) {
    horizontalProps.strokeOptions.color = hStroke;
  }

  const hStrokeType = getUrlParam("hStrokeType");
  if (hStrokeType) {
    horizontalProps.strokeOptions.stroke = Number(hStrokeType);
  }

  const hLegend = getUrlParam("hLegend");
  if (hLegend) {
    horizontalProps.sequenceOptions.isSequenceVisible =
      convertBooleanUrlParam(hLegend);
  }

  const vSeqType = getUrlParam("vSeqType");
  if (vSeqType) {
    verticalProps.sequenceOptions.sequenceType = Number(vSeqType);
  }
  const vSeq = getUrlParam("vSeq");
  if (vSeq) {
    verticalProps.sequenceOptions.sequence = vSeq;
  }
  const vStroke = getUrlParam("vStroke");
  if (vStroke) {
    verticalProps.strokeOptions.color = vStroke;
  }

  const vStrokeType = getUrlParam("vStrokeType");
  if (vStrokeType) {
    verticalProps.strokeOptions.stroke = Number(vStrokeType);
  }

  const vLegend = getUrlParam("vLegend");
  if (vLegend) {
    verticalProps.sequenceOptions.isSequenceVisible =
      convertBooleanUrlParam(vLegend);
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawHorizontalPattern(verticalProps);
  drawVerticalPattern(horizontalProps);
}

export function drawHorizontalPattern({
  sequenceOptions: { isSequenceVisible, sequence, sequenceType },
  strokeOptions: { stroke, color },
}: PatternProps) {
  let sequenceArray = prepareSequence(sequence, sequenceType);
  if (sequenceArray?.length === 0) {
    sequenceArray = [1];
  }
  for (
    let index = DISTANCE_APART;
    index < canvas.height;
    index += DISTANCE_APART
  ) {
    setStrokeStyle({ stroke, color }, index, true);
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
    for (let i = startingIndex; i < canvas.width; i += 2 * DISTANCE_APART) {
      drawHorizontalLine({ x: i, y: index }, DISTANCE_APART, ctx);
    }
    ctx.stroke();
  }
}

export function drawVerticalPattern({
  sequenceOptions: { isSequenceVisible, sequence, sequenceType },
  strokeOptions: { stroke, color },
}: PatternProps) {
  let sequenceArray = prepareSequence(sequence, sequenceType);
  if (sequenceArray?.length === 0) {
    sequenceArray = [1];
  }
  for (
    let index = DISTANCE_APART;
    index < canvas.width;
    index += DISTANCE_APART
  ) {
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
    for (let i = startingIndex; i < canvas.height; i += 2 * DISTANCE_APART) {
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

function setStrokeStyle(
  { stroke, color }: StrokeOptions,
  index: number,
  isHorizontal?: boolean
) {
  switch (stroke) {
    case Stroke.Rainbow:
      let deg = 0;
      if (isHorizontal) {
        deg = ((index / canvas.height) * 360) / 1.2;
      } else {
        deg = ((index / canvas.width) * 360) / 1.2;
      }
      ctx.strokeStyle = `hsla(${deg}, 100%, 50%, 1.0)`;
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
