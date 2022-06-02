/* eslint-disable import/named */
import { combineReducers, AnyAction } from 'redux';

const appReducer = combineReducers({});

export type IState = ReturnType<typeof appReducer>;
const rootReducer = (state: IState | undefined, action: AnyAction): IState => {
  return appReducer(state, action);
};

export default rootReducer;
