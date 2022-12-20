import Pattern from "./classPattern";
import { DISTANCE_APART } from "./constants";
import { GetBitProps, Sequence, Stroke } from "./types";
import {
  charToBinary,
  decimalToBinary,
  drawLine,
  isColor,
  isEven,
  isVowel,
  shouldTextBeBlack,
} from "./utils";

class Canvas {
  horizontalPattern: Pattern;
  verticalPattern: Pattern;
  ctx: CanvasRenderingContext2D;
  backgroundColor: string;
  width: number;
  height: number;

  constructor(
    horizontalPattern: Pattern,
    verticalPattern: Pattern,
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    backgroundColor = "black"
  ) {
    this.horizontalPattern = horizontalPattern;
    this.verticalPattern = verticalPattern;
    this.ctx = context;
    this.width = width;
    this.height = height;
    this.backgroundColor = backgroundColor;
    this.ctx.font = "8px Arial";
  }

  public getHorizontalPattern() {
    return this.horizontalPattern;
  }

  public getVerticalPattern() {
    return this.verticalPattern;
  }

  public setWidth(width: number) {
    this.width = width;
  }

  public setHeight(height: number) {
    this.height = height;
  }

  public setBackgroundColor(color: string) {
    this.backgroundColor = color;
    document.body.style.backgroundColor = color;
  }

  private clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  public draw() {
    this.ctx.moveTo(0, 0);
    this.ctx.fillStyle = shouldTextBeBlack(this.backgroundColor)
      ? "black"
      : "white";
    this.clearCanvas();
    this.drawPatternLines(this.horizontalPattern, true);
    this.drawPatternLines(this.verticalPattern, false);
  }

  private drawPatternLines(pattern: Pattern, isHorizontal: boolean) {
    let sequenceArray = this.prepareSequence(pattern);
    if (sequenceArray?.length === 0 || !sequenceArray) {
      sequenceArray = [1];
    }
    const outerLength = isHorizontal ? this.height : this.width;
    for (
      let index = DISTANCE_APART;
      index < outerLength;
      index += DISTANCE_APART
    ) {
      this.setStrokeStyle(pattern, index, isHorizontal);
      this.ctx.beginPath();

      const bit = this.getBit({
        sequence: sequenceArray,
        index: index - DISTANCE_APART,
        sequenceType: pattern.getSequenceType(),
      });
      let startingIndex = bit ? 0 : DISTANCE_APART;
      if (pattern.getIsSequenceVisible()) {
        isHorizontal
          ? this.ctx.fillText(`${bit}`, 2, index + 2)
          : this.ctx.fillText(`${bit}`, index - 2, 8);

        startingIndex += DISTANCE_APART;
      }
      const innerLength = isHorizontal ? this.width : this.height;
      for (let i = startingIndex; i < innerLength; i += 2 * DISTANCE_APART) {
        const coordinate = isHorizontal
          ? { x: i, y: index }
          : { x: index, y: i };
        const angle = isHorizontal ? 0 : 90;
        drawLine(coordinate, DISTANCE_APART, angle, this.ctx);
      }
      this.ctx.stroke();
    }
  }

  private getBit({ sequence, index, sequenceType }: GetBitProps): number {
    let sequenceValue: number;

    if (sequenceType !== Sequence.Random) {
      sequenceValue =
        sequence[
          Math.round(Math.round(index / DISTANCE_APART) % sequence.length)
        ];

      switch (sequenceType) {
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

    return isEven(Math.round(Math.random() * DISTANCE_APART)) ? 1 : 0;
  }

  private prepareSequence(pattern: Pattern) {
    const sequenceType = pattern.getSequenceType();
    const sequence = pattern.getSequence();

    if (sequenceType === Sequence.Random) {
      return null;
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

  private setStrokeStyle(
    pattern: Pattern,
    index: number,
    isHorizontal?: boolean
  ) {
    switch (pattern.getStroke()) {
      case Stroke.Rainbow:
        let deg = 0;
        if (isHorizontal) {
          deg = ((index / this.height) * 360) / 1.2;
        } else {
          deg = ((index / this.width) * 360) / 1.2;
        }
        this.ctx.strokeStyle = `hsla(${deg}, 100%, 50%, 1.0)`;
        break;
      case Stroke.Random:
        this.ctx.strokeStyle = `#${Math.floor(
          Math.random() * 16777215
        ).toString(16)}`;
        break;
      case Stroke.Custom:
        const color = pattern.getStrokeColor();
        if (color && isColor(color)) {
          this.ctx.strokeStyle = color;
        }
        break;
    }
  }
}

export default Canvas;
