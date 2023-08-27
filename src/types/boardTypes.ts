import { TColor } from './commonTypes';
import { EFigureTypes, IFigure } from './figureTypes';

export interface IFigureInField {
  color: TColor;
  figureType: EFigureTypes;
  figureComponent: React.FC<IFigure>;
}

export interface IBoardField {
  color: TColor;
  figureInField: IFigureInField | null;
}

export interface IBoardFieldsMap {
  [key: string]: IBoardField;
}
