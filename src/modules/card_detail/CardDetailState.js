// @flow

import { createActions } from 'reduxsauce'
/*
import Storage from '../../utils/petStagramStorage'
import { getAuthenticationToken, setAuthenticationToken } from '../../utils/authentication'
import api from '../../utils/api'
*/
import { actionsGenerator } from '../../store/reducerUtils'

type CardDetailState = {
  pets:Array,
}

// Initial state
const initialState = {
  pet:{
    petName: "arong",
    id: 1,
    petProfileImage:"https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180",
    petBirthDay: "2018-04-07T09:09:59.496396Z",
    petProperty: "smile",
  },
  owner:{
    userProfileImage: null,
    userEmail: "psi112233",
    introduceText: "welcome to petstagram",
    username: "psi112233",
  },
  title: "here is",
  pictures: ["https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"],
  text: "welcometo petstagram",
  like : [],     //list of userEmail who like this card
  created: "2018-04-07T09:09:59.496396Z",
  comments:[{
    ownerName: "psiiiiii",
    ownerEmail:  "psiiiiii",
    updated: "2018-04-07T09:09:59.496396Z",
    comment: "welcome",
  }],
  getCardRequest: Function,
  getCommentRequest: Function,
  deleteCardRequest: Function,
  deleteCommentRequest: Function,
  deleteLikeRequest: Function,
  postLikeRequest: Function,
  postCommentRequest: Function,
}

// Action Creators

export const { Types: CardDetailTypes, Creators: CardDetailActions } = createActions(
  actionsGenerator({
    getCardRequest: ['cardId'],
    getCommentRequest: ['cardId'],
    deleteCardRequest: ['cardId'],
    deleteCommentRequest: ['commentId'],
    deleteLikeRequest: ['cardId'],
    postLikeRequest: ['cardId'],
    postCommentRequest: ['cardId','comment'],
  })
)

// Reducer
export default function CardDetailReducer(state: CardDetailState = initialState, action: Object = {}): CardDetailState {
  switch (action.type) {
    case CardDetailTypes.GET_CARD_REQUEST:
    case CardDetailTypes.GET_COMMENT_REQUEST:
    case CardDetailTypes.DELETE_CARD_REQUEST:
    case CardDetailTypes.DELETE_COMMENT_REQUEST:
    case CardDetailTypes.DELETE_LIKE_REQUEST:
    case CardDetailTypes.POST_LIKE_REQUEST:
    case CardDetailTypes.POST_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CardDetailTypes.GET_CARD_SUCCESS:
      return {
        ...state,
        pet: action.payload.pet_id,
        owner: action.payload.writer,
        title: action.payload.title,
        pictures: action.payload.pictures,
        text: action.payload.text,
        like: action.payload.like_id,
        created: action.payload.date,
        comments: action.payload.comments,
        loading:false,
      };
    case CardDetailTypes.GET_COMMENT_SUCCESS:
      return{
        ...state,
        comments: action.payload.comments,
        loading:false,
      }
    case CardDetailTypes.DELETE_CARD_SUCCESS:
      return {
        ...state,
        loading:false,
      };
    case CardDetailTypes.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        loading:false,
      };
    case CardDetailTypes.DELETE_LIKE_SUCCESS:
      return {
        ...state,
        loading:false,
      };
    case CardDetailTypes.POST_LIKE_SUCCESS:
      return {
        ...state,
        loading:false,
      };
    case CardDetailTypes.POST_COMMENT_SUCCESS:
      return {
        ...state,
        loading:false,
      };
    case CardDetailTypes.GET_CARD_FAILURE:
    case CardDetailTypes.GET_COMMENT_FAILURE:
    case CardDetailTypes.DELETE_CARD_FAILURE:
    case CardDetailTypes.DELETE_COMMENT_FAILURE:
    case CardDetailTypes.DELETE_LIKE_FAILURE:
    case CardDetailTypes.POST_LIKE_FAILURE:
    case CardDetailTypes.POST_COMMENT_FAILURE:
      return {
        ...state,
        loading: true,
        error: action.error,
      };
    default:
      return state
  }
}
