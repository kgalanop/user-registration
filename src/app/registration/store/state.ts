import { RegistrationField } from '../models';

export interface State {
  registrationFields: RegistrationField[];
  loading: boolean;
  error: string;
}

export const initialState: State = {
  registrationFields: [],
  loading: true,
  error: ''
};
