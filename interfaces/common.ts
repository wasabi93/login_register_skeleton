/* eslint-disable import/named */
import { AnyAction, Store } from 'redux';
import { Task } from 'redux-saga';
import { IState } from '../redux/global_reducers/index';

export interface SagaStore extends Store<IState, AnyAction> {
  sagaTask: Task;
}

export interface IUser {
  username: string;
  password: string;
}

export interface AppState {
  count: number;
  error: null | Error;
  lastUpdate: number;
  light: boolean;
  placeholderData: IUser[] | null;
}

export enum actionTypes {
  FAILURE = 'FAILURE',
  RESET = 'RESET',
  LOADING = 'LOADING',
  LOAD_DATA_SUCCESS = 'LOAD_DATA_SUCCESS',
}

export type Action = Failure | Reset | Loading | LoadDataSuccess;

export interface Failure {
  type: actionTypes.FAILURE;
  error: Error;
}

export interface Reset {
  type: actionTypes.RESET;
}

export interface Loading {
  type: actionTypes.LOADING;
}

export interface LoadDataSuccess {
  type: actionTypes.LOAD_DATA_SUCCESS;
  data: IUser[];
}

export type SagaAction<T> = (
  payload: T,
  showMessage?: INotifyMessage,
  showLoading?: boolean,
  differentParams?: IObject,
  callBack?: IActionCallBack,
) => IAction<T>;

export interface IAction<T> {
  readonly type: string;
  readonly showLoading?: boolean;
  readonly hideLoading?: boolean;
  readonly loadMore?: boolean;
  readonly payload: T;
  readonly response?: { readonly success: string; readonly fail: string };
  readonly showMessage?: INotifyMessage;
  readonly differentParams?: IObject;
  readonly callBack?: IActionCallBack;
}

export interface IObject {
  readonly [s: string]: unknown;
  readonly data?: IObject | IObject[];
  readonly nextData?: IObject | IObject[];
  readonly next?: boolean;
  readonly fetchMore?: boolean;
}

export interface IActionCallBack {
  readonly handleSuccess?: () => void;
  readonly handleFail?: () => void;
}

export interface INotifyMessage {
  readonly message: string;
  readonly description?: string;
}
