import { generateAction } from '../../utils/common';
import { IUser } from '../../interfaces/common';
import { SIGN_UP, SIGN_IN } from '../actions';

export const register = generateAction<IUser>(SIGN_UP);

export const signIn = generateAction<IUser>(SIGN_IN);
