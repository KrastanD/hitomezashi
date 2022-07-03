export interface Coordinate {
  x: number;
  y: number;
}

export enum Sequence {
  Random,
  Binary,
  DecimalParity, //odds evens
  DecimalToBinary, //convert decimal to binary
  AlphabetParity, //vowels consonants
  AlphabetToBinary, //convert letter to binary
}
export type GetBitProps = {
  sequence?: number[];
  sequenceType: Sequence;
  index: number;
};

export type DrawPatternProps = {
  sequenceOptions?: SequenceOptions;
  strokeOptions?: StrokeOptions;
};

export type SequenceOptions = {
  isSequenceVisible: boolean;
  sequence: string;
  sequenceType: Sequence;
};

export type StrokeOptions = {
  stroke: Stroke;
  color?: string;
};

export type CanvasOptions = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
};
export enum Stroke {
  Rainbow,
  Random,
  Custom,
}
