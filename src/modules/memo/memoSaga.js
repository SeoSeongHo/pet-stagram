import { call, put, takeLatest } from 'redux-saga/effects'
import api from '../../utils/api'
import { MemoActions, MemoTypes } from './memoState'
import {KEYS} from '../../utils/petStagramStorage'
import Storage from '../../utils/petStagramStorage'
import Constants from '../../constants/constants'
const { API_ROOT } = Constants;
function* requestGetMemo({ }: {}) {
  try {
    console.log(Storage.get(KEYS.accessToken),"accessMemo")
    const token = yield api.get(`${API_ROOT}/memo/`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${Storage.get(KEYS.accessToken)}`,
      }}
    );
    if (token) {
      console.log(token)
      yield put(MemoActions.getMemoSuccess(token))
    }
  } catch (e) {
    yield put(MemoActions.getMemoFailure(e))
  }
}
function* requestDeleteMemo({ memo_id }: { memo_id: number }) {

  try {
    const token = yield api.delete(`${API_ROOT}/memo/${memo_id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${Storage.get(KEYS.accessToken)}`,
      }}
    );
    if (token) {
      yield put(MemoActions.deleteMemoSuccess(token))
    }
  } catch (e) {
    yield put(MemoActions.deleteMemoFailure(e))
  }
}

function* requestPostMemo({ created,text }: {created:any, text:string}) {
  const body = {
    date: created,
    text
  };

  try {
    console.log(Storage.get(KEYS.accessToken),"access")
    const token = yield api.post(`${API_ROOT}/memo/`, body,{
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${Storage.get(KEYS.accessToken)}`,
      }}
    );
    if (token) {
      yield put(MemoActions.postMemoSuccess(token))
    }
  } catch (e) {
    yield put(MemoActions.postMemoFailure(e))
  }
}

export const MemoSaga = [
  takeLatest(MemoTypes.GET_MEMO_REQUEST, requestGetMemo),
  takeLatest(MemoTypes.POST_MEMO_REQUEST, requestPostMemo),
  takeLatest(MemoTypes.DELETE_MEMO_REQUEST, requestDeleteMemo),
];
