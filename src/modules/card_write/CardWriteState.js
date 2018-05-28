// @flow

import { createActions } from 'reduxsauce'
/*
import Storage from '../../utils/petStagramStorage'
import { getAuthenticationToken, setAuthenticationToken } from '../../utils/authentication'
import api from '../../utils/api'
*/
import { actionsGenerator } from '../../store/reducerUtils'

type UserProfileState = {
  userProfileImage: any,
  userProfileName: string,
  introduceText: string,
  petProfileImage: any,
  petId: any,
  totalPost: number,
  userPicture: any,
  cardId: any,
  isFollow: boolean,
  totalFollowing: number,
  totalFollower: number,
  loading: boolean,
}

// Initial state
const initialState = {
  userProfileImage: null,
  userProfileName: "",
  introduceText: "",
  petProfileImage: null,
  petId: [],
  totalPost: 0,
  userPicture: null,
  cardId: [],
  totalFollowing: 0,
  totalFollower: 0,
  loading: false,
  isFollow: false,
}

// Action Creators

export const { Types: UserProfileTypes, Creators: UserProfileActions } = createActions(
  actionsGenerator({
    getUserProfileRequest: ['username'],
    sendMessageRequest: ['text'],
    followRequest: ['username'],
    unFollowRequest:['username'],
    followCheckRequest:['followerName','followedName'],
    editIntroduceText:['text']
  })
)

// Reducer
export default function UserProfileReducer(state: UserProfileState = initialState, action: Object = {}): UserProfileState {
  switch (action.type) {
    case UserProfileTypes.GET_USER_PROFILE_REQUEST:
    case UserProfileTypes.FOLLOW_REQUEST:
    case UserProfileTypes.UN_FOLLOW_REQUEST:
    case UserProfileTypes.SEND_MESSAGE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case UserProfileTypes.GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userProfileImage: action.payload.userProfileImage,
        userProfileName: action.payload.userProfileName,
        introduceText: action.payload.introduceText,
        petProfileImage: action.payload.petProfileImage,
        petId: action.payload.petId,
        totalPost: action.payload.totalPost,
        userPicture: action.payload.userPicture,
        cardId: action.payload.cardId,
        totalFollowing: action.payload.totalFollowing,
        totalFollower: action.payload.totalFollower,
        loading: false,
      };
    case UserProfileTypes.EDIT_INTRODUCE_TEXT:
      return {
        ...state,
        introduceText: action.text,
      }

    case UserProfileTypes.FOLLOW_CHECK_SUCCESS:
      return {
        ...state,
        isFollow: action.payload.isFollow
      }
    case UserProfileTypes.SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case UserProfileTypes.FOLLOW_SUCCESS:
      return {
        ...state,
        totalFollower: state.totalFollower+1,
      }
    case UserProfileTypes.UN_FOLLOW_SUCCESS:
      return {
        ...state,
        totalFollower: state.totalFollower-1,
      }
    case UserProfileTypes.GET_USER_PROFILE_FAILURE:
      return {
        ...state,
        error:action.error,
        loading:false,
      };
    case UserProfileTypes.SEND_MESSAGE_FAILURE:
      return {
        ...state,
        loading: false,
      }
    case UserProfileTypes.FOLLOW_FAILURE:
      return {
        ...state,
        error:action.error,
        loading:false,
      }
    case UserProfileTypes.FOLLOW_CHECK_FAILURE:
    case UserProfileTypes.UN_FOLLOW_FAILURE:
      return {
        ...state,
        error:action.error,
        loading:false,
      }
    default:
      return state
  }
}
