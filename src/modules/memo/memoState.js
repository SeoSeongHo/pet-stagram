// @flow

import { createActions } from 'reduxsauce'
/*
import Storage from '../../utils/petStagramStorage'
import { getAuthenticationToken, setAuthenticationToken } from '../../utils/authentication'
import api from '../../utils/api'
*/
import { actionsGenerator } from '../../store/reducerUtils'

type memoState = {
  loading: boolean,
}

// Initial state
const initialState = {
  loading: false,
}

// Action Creators

export const { Types: memoTypes, Creators: memoActions } = createActions(
  actionsGenerator({
    sendMemoRequest: ['title','date','content'],
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
    case LoginTypes.LOGIN_SUCCESS:
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

    default:
      return state
  }
}
