// @flow

import { createActions } from 'reduxsauce'
/*
import Storage from '../../utils/petStagramStorage'
import { getAuthenticationToken, setAuthenticationToken } from '../../utils/authentication'
import api from '../../utils/api'
*/
import { actionsGenerator } from '../../store/reducerUtils'

type MainPageState = {
  loading: boolean,
}

// Initial state
const initialState = {
  loading: false,
}

// Action Creators

export const { Types: MainPageTypes, Creators: MainPageActions } = createActions(
  actionsGenerator({
    getCardRequest:[],
  })
)

// Reducer
export default function MainPageReducer(state: MainPageState = initialState, action: Object = {}): MainPageState {
  switch (action.type) {
    case MainPageTypes.GET_CARD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MainPageTypes.GET_CARD_SUCCESS:
      return {
        ...state,
        cards: action.payload.cards,
        loading: false,
      };
    case MainPageTypes.GET_CARD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state
  }
}
