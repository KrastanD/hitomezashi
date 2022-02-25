import {
  Coordinate,
  DrawPatternProps,
  GetBitProps,
  StrokeOptions,
} from "./types.js";

let width: number,
  height: number,
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement;

const DISTANCE_APART = 10;
(function () {
  canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
  ctx = canvas.getContext("2d");

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
})();

drawPattern();

function drawPattern() {
  ctx.moveTo(0, 0);
  ctx.fillStyle = "white";
  document.body.style.backgroundColor = "black";
  ctx.font = "8px Arial";

  drawHorizontalPattern({
    sequenceOptions: {
      isSequenceVisible: true,
      isSequenceRandom: true,
      sequence: [0, 1, 0],
    },
    strokeOptions: { isRainbow: true, isRandom: true, color: "red" },
  });
  drawVerticalPattern({
    sequenceOptions: {
      isSequenceVisible: true,
      isSequenceRandom: true,
      sequence: [1, 0, 1],
    },
    strokeOptions: { isRainbow: true, isRandom: true, color: "green" },
  });
}

function drawHorizontalPattern({
  sequenceOptions: { isSequenceVisible, isSequenceRandom, sequence },
  strokeOptions: { isRainbow, isRandom, color },
}: DrawPatternProps) {
  for (let index = DISTANCE_APART; index < height; index += DISTANCE_APART) {
    setStrokeStyle({ isRainbow, isRandom, color }, index);
    ctx.beginPath();

    const bit = getBit({ isSequenceRandom, sequence, index });
    let startingIndex = bit ? 0 : DISTANCE_APART;
    if (isSequenceVisible) {
      ctx.fillText(`${bit}`, 2, index + 2);
      startingIndex += DISTANCE_APART;
    }
    for (let i = startingIndex; i < width; i += 20) {
      drawHorizontalLine({ x: i, y: index }, DISTANCE_APART);
    }
    ctx.stroke();
  }
}

function drawVerticalPattern({
  sequenceOptions: { isSequenceVisible, isSequenceRandom, sequence },
  strokeOptions: { isRainbow, isRandom, color },
}: DrawPatternProps) {
  for (let index = DISTANCE_APART; index < width; index += DISTANCE_APART) {
    setStrokeStyle({ isRainbow, isRandom, color }, index);
    ctx.beginPath();
    const bit = getBit({ isSequenceRandom, sequence, index });
    let startingIndex = bit ? 0 : DISTANCE_APART;
    if (isSequenceVisible) {
      ctx.fillText(`${bit}`, index - 2, 8);
      startingIndex += DISTANCE_APART;
    }
    for (let i = startingIndex; i < height; i += 20) {
      drawVerticalLine({ x: index, y: i }, DISTANCE_APART);
    }
    ctx.stroke();
  }
}

function getBit({ isSequenceRandom, sequence, index }: GetBitProps) {
  if (isSequenceRandom) {
    return isEven(Math.round(Math.random() * DISTANCE_APART)) ? 1 : 0;
  } else if (sequence) {
    return sequence[
      Math.round(Math.round(index / DISTANCE_APART) % sequence.length)
    ];
  } else {
    return 1;
  }
}
function drawHorizontalLine({ x, y }: Coordinate, distance: number) {
  ctx.moveTo(x, y);
  ctx.lineTo(x + distance, y);
}

function drawVerticalLine({ x, y }: Coordinate, distance: number) {
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + distance);
}

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

function isEven(num: number) {
  return num % 2 === 0;
}

function isColor(strColor: string) {
  const s = new Option().style;
  s.color = strColor;
  return s.color !== "";
}

function setStrokeStyle(
  { isRainbow, isRandom, color }: StrokeOptions,
  index: number
) {
  if (isRainbow) {
    ctx.strokeStyle = "hsla(" + Math.round(index / 1.7) + ", 100%, 50%, 1.0)";
  } else if (isRandom) {
    ctx.strokeStyle = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  } else {
    if (isColor(color)) {
      ctx.strokeStyle = color;
    } else {
      ctx.strokeStyle = "white";
    }
  }
}
