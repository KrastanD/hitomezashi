export interface Coordinate {
  x: number;
  y: number;
}

export type GetBitProps = {
  isSequenceRandom: boolean;
  sequence: number[];
  index: number;
};

export type DrawPatternProps = {
  sequenceOptions?: SequenceOptions;
  strokeOptions?: StrokeOptions;
};

export type SequenceOptions = {
  isSequenceVisible: boolean;
  isSequenceRandom: boolean;
  sequence: number[];
};

export type StrokeOptions = {
  isRainbow: boolean;
  isRandom: boolean;
  color: string;
};
