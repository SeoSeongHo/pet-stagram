import { call, put, takeLatest } from 'redux-saga/effects'
import { setAuthenticationToken } from '../../utils/authentication'
import api from '../../utils/api'
import { MemoActions, MemoTypes } from './memoState'
import Constants from '../../constants/constants'

const { API_ROOT } = Constants

function* requestMemo({ pet, content }: {pet: string, content: string}) { // add date after implementing date
  const body = {
    pet,
    content,
  }

  try {
    const token = yield api.post('http://127.0.0.1:8000/api-token-auth/', body
    )
    if (token) {
      console.log(token)
      yield setAuthenticationToken(token)
      yield put(MemoActions.memoSuccess(token))
    }
  } catch (e) {
    yield put(MemoActions.memoFailure(e))
  }
}


export const MemoSaga = [
  takeLatest(MemoTypes.MEMO_REQUEST, requestMemo),
]
