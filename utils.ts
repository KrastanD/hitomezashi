import { Coordinate } from "./types";

export function isColor(strColor: string) {
  const s = new Option().style;
  s.color = strColor;
  return s.color !== "";
}

export function isVowel(char: string) {
  const vowels = ["a", "e", "i", "o", "u"];
  const ans = vowels.indexOf(char.toLowerCase()) > -1;
  return ans;
}

export function isEven(num: number) {
  return num % 2 === 0;
}

export function decimalToBinary(num: number): number {
  return Number((num >>> 0).toString(2));
}

export function charToBinary(char: string): number {
  return decimalToBinary(char.charCodeAt(0));
}

export function drawHorizontalLine(
  { x, y }: Coordinate,
  distance: number,
  ctx: CanvasRenderingContext2D
) {
  ctx.moveTo(x, y);
  ctx.lineTo(x + distance, y);
}

export function drawVerticalLine(
  { x, y }: Coordinate,
  distance: number,
  ctx: CanvasRenderingContext2D
) {
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + distance);
}
