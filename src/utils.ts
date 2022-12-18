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

export function drawLine(
  { x, y }: Coordinate,
  distance: number,
  angle: number,
  ctx: CanvasRenderingContext2D
) {
  ctx.moveTo(x, y);
  ctx.lineTo(
    x + distance * Math.cos(degreesToRadians(angle)),
    y + distance * Math.sin(degreesToRadians(angle))
  );
}

export function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export function insertUrlParam(key: string, value: string) {
  let searchParams = new URLSearchParams(window.location.search);
  searchParams.set(key, value);
  updateAndPushUrl(searchParams);
}

export function getUrlParam(key: string) {
  let searchParams = new URLSearchParams(window.location.search);
  let value = searchParams.get(key);
  if (value) {
    return decodeURIComponent(value);
  }
  return null;
}

export function removeUrlParam(key: string) {
  let searchParams = new URLSearchParams(window.location.search);
  searchParams.delete(key);
  updateAndPushUrl(searchParams);
}

function updateAndPushUrl(searchParams: URLSearchParams) {
  let newurl =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    "?" +
    searchParams.toString();
  window.history.pushState({ path: newurl }, "", newurl);
}

export function convertBooleanUrlParam(value: string) {
  return value === "true";
}

export function shouldTextBeBlack(bgColor: string): boolean {
  const color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor; //shouldn't be necessary but just in case
  const red = parseInt(color.substring(0, 2), 16); // hexToR
  const green = parseInt(color.substring(2, 4), 16); // hexToG
  const blue = parseInt(color.substring(4, 6), 16); // hexToB
  return red * 0.299 + green * 0.587 + blue * 0.114 > 186 ? true : false;
}
