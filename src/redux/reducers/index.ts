import { combineReducers } from 'redux';
import { boardFields } from './BoardFields';

const rootReducer = combineReducers({
  boardFieldsMap: boardFields,
});

export default rootReducer;
