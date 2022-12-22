import Canvas from "./src/classCanvas";

export interface global {}
declare global {
  var canvas: Canvas;
}
