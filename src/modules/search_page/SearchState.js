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
  getCardListRequest:Function,
}

// Initial state
const initialState = {
  loading: false,
}

// Action Creators

export const { Types: SearchTypes, Creators: SearchActions } = createActions(
  actionsGenerator({
    getCardListRequest:['query'],
    getUserListRequest:['query'],
  })
)

// Reducer
export default function SearchReducer(state: SearchState = initialState, action: Object = {}): SearchState {
  switch (action.type) {
    case SearchTypes.GET_CARD_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SearchTypes.GET_CARD_LIST_SUCCESS:
      return {
        ...state,
        cards: action.payload.cards,
        loading: false,
      };
    case SearchTypes.GET_CARD_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case SearchTypes.GET_USER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SearchTypes.GET_USER_LIST_SUCCESS:
      return {
        ...state,
        users: action.payload.users,
        loading: false,
      };
    case SearchTypes.GET_USER_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state
  }
}
