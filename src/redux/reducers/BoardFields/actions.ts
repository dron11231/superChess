import { IBoardFieldsMap } from 'types';
import { createAction } from 'typesafe-actions';
import { IAppendFigurePayload, IMoveFigurePayload } from './types';

export const generateBoardFieldsAction = createAction(
  '$board/generateBoardData',
)<IBoardFieldsMap>();

export const appendFigureInField = createAction('$board/appendFigure')<IAppendFigurePayload>();

export const moveFigure = createAction('$board/moveFigure')<IMoveFigurePayload>();
