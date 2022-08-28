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

export function insertUrlParam(key: string, value: string) {
  if (history.pushState) {
    let searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, value);
    updateAndPushUrl(searchParams);
  }
}

export function getUrlParam(key: string) {
  let searchParams = new URLSearchParams(window.location.search);
  let value: string | null = searchParams.get(key);
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
