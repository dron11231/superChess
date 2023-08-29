import { TColor } from './commonTypes';

export interface IFigure {
  color: TColor;
}

export enum EFigureTypes {
  Pawn = 'PAWN',
  Knight = 'KNIGHT',
  Elephant = 'ELEPHANT',
  Rook = 'ROOK',
  Queen = 'QUEEN',
  King = 'KING',
}
