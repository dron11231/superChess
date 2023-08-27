import { RootReducer } from 'index';
import { IBoardFieldsMap } from 'types';

export const getBoardFieldsMap = (state: RootReducer): IBoardFieldsMap => state.boardFieldsMap;
