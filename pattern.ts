import { DISTANCE_APART } from "./constants";
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

const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

let defaultProps: DrawPatternProps = {
  sequenceOptions: {
    isSequenceVisible: true,
    sequenceType: Sequence.Random,
    sequence: "",
  },
  strokeOptions: { stroke: Stroke.Rainbow },
};
let horizontalProps = { ...defaultProps };
let verticalProps = { ...defaultProps };

export function drawPattern(
  newVerticalProps?: DrawPatternProps,
  newHorizontalProps?: DrawPatternProps
) {
  ctx.moveTo(0, 0);
  ctx.fillStyle = "white";
  document.body.style.backgroundColor = "black";
  ctx.font = "8px Arial";

  if (newVerticalProps) {
    verticalProps = newVerticalProps;
  }

  if (newHorizontalProps) {
    horizontalProps = newHorizontalProps;
  }

  drawHorizontalPattern(verticalProps);
  drawVerticalPattern(horizontalProps);
}

export function drawHorizontalPattern({
  sequenceOptions: { isSequenceVisible, sequence, sequenceType },
  strokeOptions: { stroke, color },
}: DrawPatternProps) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const sequenceArray = prepareSequence(sequence, sequenceType);
  for (
    let index = DISTANCE_APART;
    index < canvas.height;
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
}: DrawPatternProps) {
  const sequenceArray = prepareSequence(sequence, sequenceType);
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
