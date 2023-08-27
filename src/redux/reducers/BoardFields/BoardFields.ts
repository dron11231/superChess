import { IBoardFieldsMap } from 'types';
import { ActionType, createReducer } from 'typesafe-actions';
import * as actions from './actions';

const initialState: IBoardFieldsMap = {};

export const boardFields = createReducer<IBoardFieldsMap, ActionType<typeof actions>>(initialState)
  .handleAction(actions.generateBoardFieldsAction, (state, action) => ({
    ...state,
    ...action.payload,
  }))
  .handleAction(actions.appendFigureInField, (state, action) => ({
    ...state,
    [action.payload.position]: {
      ...state[action.payload.position],
      figureInField: action.payload.figureInField,
    },
  }))
  .handleAction(actions.moveFigure, (state, action) => ({
    ...state,
    [action.payload.positionFrom]: { ...state[action.payload.positionFrom], figureInField: null },
    [action.payload.positionTo]: {
      ...state[action.payload.positionTo],
      figureInField: state[action.payload.positionFrom].figureInField,
    },
  }));
