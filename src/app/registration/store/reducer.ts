import { Actions, ActionTypes } from './actions';
import { initialState, State } from './state';

export function featureReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.GET_REGISTRATION_FIELDS:
      return {
        ...state,
        loading: true,
        error: '',
        registrationFields: []
      };
    case ActionTypes.REGISTRATION_FIELDS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        registrationFields: action.payload.slice()
      };
    case ActionTypes.REGISTRATION_FIELDS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        registrationFields: []
      };
    case ActionTypes.REGISTER_USER:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case ActionTypes.REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
      };
    case ActionTypes.REGISTER_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default: {
      return state;
    }
  }
}
