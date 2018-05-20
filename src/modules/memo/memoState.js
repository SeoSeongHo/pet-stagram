// @flow

import { createActions } from 'reduxsauce'
/*
import Storage from '../../utils/petStagramStorage'
import { getAuthenticationToken, setAuthenticationToken } from '../../utils/authentication'
import api from '../../utils/api'
*/
import { actionsGenerator } from '../../store/reducerUtils'

type MemoState = {
  loading: boolean,
}

// Initial state
const initialState = {
  loading: false,
}

// Action Creators

export const { Types: MemoTypes, Creators: MemoActions } = createActions(
  actionsGenerator({
    sendMemoRequest: ['pet','content'], // add date after implementing date
  })
)

// Reducer
export default function LoginReducer(state: MemoState = initialState, action: Object = {}): MemoState {
  switch (action.type) {
    case MemoTypes.MEMO_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case MemoTypes.MEMO_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case MemoTypes.MEMO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }

    default:
      return state
  }
}
