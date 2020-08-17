import { Action } from '@ngrx/store';
import { RegistrationField, RegistrationRequest } from '../models';

export enum ActionTypes {
  GET_REGISTRATION_FIELDS = '[GET] Registration Fields',
  REGISTRATION_FIELDS_SUCCESS = 'Registration Fields Success',
  REGISTRATION_FIELDS_ERROR = 'Registration Fields Error',
  REGISTER_USER = '[POST] Register User',
  REGISTER_USER_SUCCESS = 'Register User Success',
  REGISTER_USER_ERROR = 'Register User Error'
}

export class GetRegistrationFieldsAction implements Action {
  readonly type = ActionTypes.GET_REGISTRATION_FIELDS;

  constructor() {}
}

export class RegistrationFieldsSuccessAction implements Action {
  readonly type = ActionTypes.REGISTRATION_FIELDS_SUCCESS;

  constructor(public payload: RegistrationField[]) {}
}

export class RegistrationFieldsErrorAction implements Action {
  readonly type = ActionTypes.REGISTRATION_FIELDS_ERROR;

  constructor(public payload: string) {}
}

export class RegisterUserAction implements Action {
  readonly type = ActionTypes.REGISTER_USER;

  constructor(public payload: RegistrationRequest) {}
}

export class RegisterUserSuccessAction implements Action {
  readonly type = ActionTypes.REGISTER_USER_SUCCESS;

  constructor() {}
}

export class RegisterUserErrorAction implements Action {
  readonly type = ActionTypes.REGISTER_USER_ERROR;

  constructor(public payload: string) {}
}

export type Actions =
  GetRegistrationFieldsAction |
  RegistrationFieldsSuccessAction |
  RegistrationFieldsErrorAction |
  RegisterUserAction |
  RegisterUserSuccessAction |
  RegisterUserErrorAction;

