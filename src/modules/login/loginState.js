// @flow

import { createActions } from 'reduxsauce'
/*
import Storage from '../../utils/petStagramStorage'
import { getAuthenticationToken, setAuthenticationToken } from '../../utils/authentication'
import api from '../../utils/api'
*/
import { actionsGenerator } from '../../store/reducerUtils'

type LoginState = {
  loading: boolean,
  error: string,
}

// Initial state
const initialState = {
  loading: false,
  error: null,
}

// Action Creators

export const { Types: LoginTypes, Creators: LoginActions } = createActions(
  actionsGenerator({
    loginRequest: ['userEmail', 'password'],
    signUpRequest: ['userEmail','password'],
    checkDuplicateRequest: ['userEmail'],
  })
)

// Reducer
export default function LoginReducer(state: LoginState = initialState, action: Object = {}): LoginState {
  switch (action.type) {
    case LoginTypes.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case LoginTypes.SIGN_UP_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case LoginTypes.CHECK_DUPLICATE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case LoginTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case LoginTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case LoginTypes.CHECK_DUPLICATE_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case LoginTypes.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case LoginTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case LoginTypes.CHECK_DUPLICATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }

    default:
      return state
  }
}
