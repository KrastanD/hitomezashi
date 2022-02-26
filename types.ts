export interface Coordinate {
  x: number;
  y: number;
}

export enum Sequence {
  Binary = "binary",
  DecimalParity = "decimalParity", //odds evens
  DecimalToBinary = "decimalToBinary", //convert decimal to binary
  AlphabetParity = "alphabetParity", //vowels consonants
  AlphabetToBinary = "alphabetToBinary", //convert letter to binary
  Random = "random",
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
  isRainbow: boolean;
  isRandom: boolean;
  color: string;
};
