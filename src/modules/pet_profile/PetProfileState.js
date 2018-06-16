// @flow

import { createActions } from 'reduxsauce'
/*
import Storage from '../../utils/petStagramStorage'
import { getAuthenticationToken, setAuthenticationToken } from '../../utils/authentication'
import api from '../../utils/api'
*/
import { actionsGenerator } from '../../store/reducerUtils'

type UserProfileState = {
  petProfileImage: string,
  petName:string,
  id: number,
  petBirthDay: any,
  petProperty: string,
  users:any,
  loading: boolean,
}

// Initial state
const initialState = {
  petProfileImage: "",
  petName:"",
  id: -1,
  petBirthDay: "",
  petProperty: "",
  users: [],
  loading: false,
}

// Action Creators

export const { Types: PetProfileTypes, Creators: PetProfileActions } = createActions(
  actionsGenerator({
    getPetProfileRequest: ['id'],
    editPetProfileRequest:['id','text','petBirth','petProfileImage']
  })
)

// Reducer
export default function PetProfileReducer(state: PetProfileState = initialState, action: Object = {}): PetProfileState {
  switch (action.type) {
    case PetProfileTypes.EDIT_PET_PROFILE_REQUEST:
    case PetProfileTypes.GET_PET_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case PetProfileTypes.GET_PET_PROFILE_SUCCESS:
      return {
        ...state,
        petProfileImage: action.payload.petProfileImage,
        petName:action.payload.petName,
        id: action.payload.id,
        petBirthDay: action.payload.petBirthDay,
        petProperty: action.payload.petProperty,
        users: action.payload.users,
        loading: false,
      };
    case PetProfileTypes.EDIT_PET_PROFILE_SUCCESS:
      return {
        ...state,
        petProperty: action.payload.petProperty,
        petBirth: action.payload.petBirth,
        petProfileImage: action.payload.petProfileImage,
        loading: false,
      }
    case PetProfileTypes.EDIT_PET_PROFILE_FAILURE:
    case PetProfileTypes.GET_PET_PROFILE_FAILURE:
      return {
        ...state,
        error:action.error,
        loading:false,
      }
    default:
      return state
  }
}
