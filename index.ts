import {
  Coordinate,
  DrawPatternProps,
  GetBitProps,
  Sequence,
  StrokeOptions,
} from "./types";

let width: number,
  height: number,
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  sidebar: HTMLDivElement,
  sidebarOpenButton: HTMLSpanElement,
  sidebarCloseButton: HTMLSpanElement;

const DISTANCE_APART = 10;
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

drawPattern();

function drawPattern() {
  ctx.moveTo(0, 0);
  ctx.fillStyle = "white";
  document.body.style.backgroundColor = "black";
  ctx.font = "8px Arial";

  drawHorizontalPattern({
    sequenceOptions: {
      isSequenceVisible: false,
      sequenceType: Sequence.Random,
      sequence: "",
    },
    strokeOptions: { isRainbow: true, isRandom: false, color: "" },
  });
  drawVerticalPattern({
    sequenceOptions: {
      isSequenceVisible: false,
      sequenceType: Sequence.Random,
      sequence: "",
    },
    strokeOptions: { isRainbow: true, isRandom: false, color: "" },
  });
}

function drawHorizontalPattern({
  sequenceOptions: { isSequenceVisible, sequence, sequenceType },
  strokeOptions: { isRainbow, isRandom, color },
}: DrawPatternProps) {
  const sequenceArray = prepareSequence(sequence, sequenceType);
  for (let index = DISTANCE_APART; index < height; index += DISTANCE_APART) {
    setStrokeStyle({ isRainbow, isRandom, color }, index);
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
      drawHorizontalLine({ x: i, y: index }, DISTANCE_APART);
    }
    ctx.stroke();
  }
}

function drawVerticalPattern({
  sequenceOptions: { isSequenceVisible, sequence, sequenceType },
  strokeOptions: { isRainbow, isRandom, color },
}: DrawPatternProps) {
  const sequenceArray = prepareSequence(sequence, sequenceType);
  for (let index = DISTANCE_APART; index < width; index += DISTANCE_APART) {
    setStrokeStyle({ isRainbow, isRandom, color }, index);
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
      drawVerticalLine({ x: index, y: i }, DISTANCE_APART);
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
function drawHorizontalLine({ x, y }: Coordinate, distance: number) {
  ctx.moveTo(x, y);
  ctx.lineTo(x + distance, y);
}

function drawVerticalLine({ x, y }: Coordinate, distance: number) {
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + distance);
}

sidebarOpenButton.onclick = function openNav() {
  document.getElementById("mySidebar").style.width = "20vw";
  canvas.style.paddingLeft = "20vw";
};

sidebarCloseButton.onclick = function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  canvas.style.paddingLeft = "0";
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

function isEven(num: number) {
  return num % 2 === 0;
}

function decimalToBinary(num: number): number {
  return Number((num >>> 0).toString(2));
}

function charToBinary(char: string): number {
  return decimalToBinary(char.charCodeAt(0));
}

function isColor(strColor: string) {
  const s = new Option().style;
  s.color = strColor;
  return s.color !== "";
}

function isVowel(char: string) {
  //return whether a character is a consonant
  const vowels = ["a", "e", "i", "o", "u"];
  const ans = vowels.indexOf(char.toLowerCase()) > -1;
  return ans;
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
