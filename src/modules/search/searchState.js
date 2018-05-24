// @flow

import { createActions } from 'reduxsauce'
/*
import Storage from '../../utils/petStagramStorage'
import { getAuthenticationToken, setAuthenticationToken } from '../../utils/authentication'
import api from '../../utils/api'
*/
import { actionsGenerator } from '../../store/reducerUtils'

type SearchState = {
  loading: boolean,
}

// Initial state
const initialState = {
  loading: false,
}

// Action Creators

export const { Types: SearchTypes, Creators: SearchActions } = createActions(
  actionsGenerator({
    searchRequest: ['keyword'],
  })
)

// Reducer
export default function SearchReducer(state: SearchState = initialState, action: Object = {}): SearchState {
  switch (action.type) {
    case SearchTypes.SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case SearchTypes.SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case SearchTypes.SEARCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }

    default:
      return state
  }
}
