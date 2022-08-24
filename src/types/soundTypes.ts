export type BasicOscillatorType = 'sine' | 'square' | 'sawtooth' | 'triangle';
export type FatOscillatorType =
  | 'fatsine'
  | 'fatsquare'
  | 'fatsawtooth'
  | 'fattriangle';
export type AMOscillatorType =
  | 'amsine'
  | 'amsquare'
  | 'amsawtooth'
  | 'amtriangle';
export type FMOscillatorType =
  | 'fmsine'
  | 'fmsquare'
  | 'fmsawtooth'
  | 'fmtriangle';
export type OscillatorType =
  | 'pwm'
  | 'pulse'
  | BasicOscillatorType
  | AMOscillatorType
  | FatOscillatorType
  | FMOscillatorType;
