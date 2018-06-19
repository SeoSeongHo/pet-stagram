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
  userEmail: String,
  userBirthDay: any,
  introduceText: String,
  pets: any,
  totalPost: number,
  cards: any,
  totalFollowing: number,
  totalFollower: number,
  loading: false,
}

// Initial state
const initialState = {
  userProfileImage: "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180",
  userEmail: "psi97300000",
  introduceText: "자기를 소개해주세요~",
  pets: [],
  filterUser:[],
  totalPost: 0,
  cards: [],
  userBirthDay: null,
  totalFollowing: 0,
  totalFollower: 0,
  loading: false,
}

// Action Creators

export const { Types: UserProfileTypes, Creators: UserProfileActions } = createActions(
  actionsGenerator({
    getUserProfileRequest: ['userEmail'],
    postPetRequest: ['petName','petProfileImage','petBirthDay','introduceText','owner'],
    sendMessageRequest: ['text'],
    followRequest: ['userEmail','followedName'],
    unFollowRequest:['userEmail','followedName'],
    followCheckRequest:['followerName','followedName'],
    editIntroduceTextRequest:['userEmail','text'],
    editUserProfileRequest:['username','text','userBirthDay','userProfileImage'],
    getUserFilterRequest: ['userEmail'],
  })
)

// Reducer
export default function UserProfileReducer(state: UserProfileState = initialState, action: Object = {}): UserProfileState {
  switch (action.type) {
    case UserProfileTypes.POST_PET_REQUEST:
    case UserProfileTypes.GET_USER_FILTER_REQUEST:
    case UserProfileTypes.GET_USER_PROFILE_REQUEST:
    case UserProfileTypes.FOLLOW_REQUEST:
    case UserProfileTypes.UN_FOLLOW_REQUEST:
    case UserProfileTypes.SEND_MESSAGE_REQUEST:
    case UserProfileTypes.EDIT_USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case UserProfileTypes.POST_PET_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case UserProfileTypes.POST_PET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case UserProfileTypes.GET_USER_FILTER_SUCCESS:
      return {
        ...state,
        filterUser: action.payload.result
      }
    case UserProfileTypes.GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userBirthDay: action.payload.userBirthDay,
        userProfileImage: action.payload.userProfileImage,
        userEmail: action.payload.email,
        introduceText: action.payload.introduceText,
        pets: action.payload.pets,
        totalPost: action.payload.totalPost,
        cards: action.payload.cards,
        totalFollowing: action.payload.totalFollowing,
        totalFollower: action.payload.totalFollowed,
        username: action.payload.username,
        loading: false,
      };
    case UserProfileTypes.EDIT_USER_PROFILE_SUCCESS:
      return {
        ...state,
        introduceText: action.payload.text,
        userBirthDay: action.payload.userBirthDay,
        userProfileImage: action.payload.userProfileImage,
        loading:true,
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
    case UserProfileTypes.GET_USER_FILTER_FAILURE:
      return {
        ...state,
        error:action.error,
      }
    case UserProfileTypes.FOLLOW_FAILURE:
      return {
        ...state,
        error:action.error,
        loading:false,
      }
    case UserProfileTypes.FOLLOW_CHECK_FAILURE:
    case UserProfileTypes.EDIT_USER_PROFILE_FAILURE:
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
