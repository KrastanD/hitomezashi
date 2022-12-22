import { Sequence, Stroke } from "./types.js";

class Pattern {
  private isSequenceVisible = true;
  private sequenceType = Sequence.Random;
  private sequence = "";
  private stroke = Stroke.Rainbow;
  private strokeColor: undefined | string = undefined;
  public getIsSequenceVisible() {
    return this.isSequenceVisible;
  }

  public getSequenceType() {
    return this.sequenceType;
  }

  public getSequence() {
    return this.sequence;
  }

  public getStroke() {
    return this.stroke;
  }

  public getStrokeColor() {
    return this.strokeColor;
  }

  public setIsSequenceVisible(status: boolean) {
    this.isSequenceVisible = status;
  }

  public setSequenceType(type: Sequence) {
    this.sequenceType = type;
  }

  public setSequence(sequence: string) {
    this.sequence = sequence;
  }

  public setStroke(stroke: Stroke) {
    this.stroke = stroke;
  }

  public setStrokeColor(color: string) {
    this.strokeColor = color;
  }
}

export default Pattern;
