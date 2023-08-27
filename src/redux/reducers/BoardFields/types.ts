import { IFigureInField } from 'types';

export interface IAppendFigurePayload {
  position: string;
  figureInField: IFigureInField;
}

export interface IMoveFigurePayload {
  positionFrom: string;
  positionTo: string;
}
