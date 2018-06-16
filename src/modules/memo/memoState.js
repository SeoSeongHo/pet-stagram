// @flow

import { createActions } from 'reduxsauce'
/*
import Storage from '../../utils/petStagramStorage'
import { getAuthenticationToken, setAuthenticationToken } from '../../utils/authentication'
import api from '../../utils/api'
*/
import { actionsGenerator } from '../../store/reducerUtils'

type MemoState = {
  pets:Array,
}

// Initial state
const initialState = {
  Memo:[
    {
      created:'2018-06-09T09:09:59.496396Z',
      Text: " 산책가기 ",
      id: 1,
    },
    {
      created:'2018-06-09T09:09:50.496397Z',
      Text: " 밥먹이기",
      id: 2
    },
    {
      created:'2018-06-09T09:09:52.496397Z',
      Text: " 미용하기",
      id:3
    }
  ]
}

// Action Creators

export const { Types: MemoTypes, Creators: MemoActions } = createActions(
  actionsGenerator({
    getMemoRequest: [],
    deleteMemoRequest: ['memo_id'],
    postMemoRequest: ['created','text'],
  })
)

// Reducer
export default function MemoReducer(state: MemoState = initialState, action: Object = {}): MemoState {
  switch (action.type) {
    case MemoTypes.GET_MEMO_REQUEST:
    case MemoTypes.DELETE_MEMO_REQUEST:
    case MemoTypes.POST_MEMO_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case MemoTypes.DELETE_MEMO_SUCCESS:
      return {
        ...state,
        loading:false,
      }
    case MemoTypes.GET_MEMO_SUCCESS:
      return {
        ...state,
        Memo: action.payload,
        loading:false,
      };
    case MemoTypes.POST_MEMO_SUCCESS:  // afterPost update cardview
      return {
        ...state,
        loading:false,
      };
    case MemoTypes.DELETE_MEMO_FAILURE:
    case MemoTypes.GET_MEMO_FAILURE:
    case MemoTypes.POST_MEMO_FAILURE:
      return {
        ...state,
        error:action.error,
        loading:false,
      }
    default:
      return state
  }
}
