import {
  IAction,
  IActionCallBack,
  INotifyMessage,
  IObject,
  SagaAction,
} from '../interfaces/common';
import { FAILURE, SUCCESS } from '../redux/action-type-utils';

export function generateAction<T>(type: string): SagaAction<T> {
  const result = (
    payload: T,
    showMessage?: INotifyMessage,
    showLoading?: boolean,
    differentParams?: IObject,
    callBack?: IActionCallBack,
  ) => {
    const action: IAction<T> = {
      type: type,
      response: {
        success: SUCCESS(type),
        fail: FAILURE(type),
      },
      payload,
      showLoading,
      showMessage,
      differentParams,
      callBack,
    };

    return action;
  };

  return result;
}
