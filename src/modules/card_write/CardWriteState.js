// @flow

import { createActions } from 'reduxsauce'
/*
import Storage from '../../utils/petStagramStorage'
import { getAuthenticationToken, setAuthenticationToken } from '../../utils/authentication'
import api from '../../utils/api'
*/
import { actionsGenerator } from '../../store/reducerUtils'

type CardWriteState = {
 pets:Array,
}

// Initial state
const initialState = {
  pets:[{
    petName:"arong",  petId: "1",
    petImages: "../../assets/images/examples.jpg",
    petBirthDay: '2018-04-07T09:09:59.496396Z',
    petProperty: "she is small",
  },{
    petName:"biggy",  petId: "2",
    petImages: "../../assets/images/examples.jpg",
    petBirthDay: '2018-04-07T09:09:59.496396Z',
    petProperty: "she is small",
  }],
}

// Action Creators

export const { Types: CardWriteTypes, Creators: CardWriteActions } = createActions(
  actionsGenerator({
    getPetRequest: ['username'],
    postCardRequest: ['pets','pictures','title','text','date'],
  })
)

// Reducer
export default function CardWriteReducer(state: CardWriteState = initialState, action: Object = {}): CardWriteState {
  switch (action.type) {
    case CardWriteTypes.GET_PET_REQUEST:
    case CardWriteTypes.POST_CARD_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CardWriteTypes.GET_PET_SUCCESS:
      return {
        ...state,
       pets: action.payload,
        loading:false,
      };
    case CardWriteTypes.POST_CARD_SUCCESS:  // afterPost update cardview
      return {
        ...state,
        loading:false,
      };
    case CardWriteTypes.GET_PET_FAILURE:
    case CardWriteTypes.POST_CARD_FAILURE:
      return {
        ...state,
        error:action.error,
        loading:false,
      }
    default:
      return state
  }
}
