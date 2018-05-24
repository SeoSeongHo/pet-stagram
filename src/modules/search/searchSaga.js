import { call, put, takeLatest } from 'redux-saga/effects'
import { setAuthenticationToken } from '../../utils/authentication'
import api from '../../utils/api'
import { LoginActions, LoginTypes } from './loginState'
import Constants from '../../constants/constants'
// import Storage, { KEYS } from '../../utils/petStagramStorage'
// import _ from 'lodash'

const { API_ROOT } = Constants

function* requestSearch({ keyword }: {keyword: string}) {
  const body = {
    keyword,
  }

  // need to implement searchSaga later
  try {
    const token = yield api.post('http://127.0.0.1:8000/api-token-auth/', body
    )
    if (token) {
      console.log(token)
      yield setAuthenticationToken(token)
      yield put(SearchActions.searchSuccess(token))
    }
  } catch (e) {
    yield put(SearchActions.searchFailure(e))
  }
}


export const SearchSaga = [
  takeLatest(SearchTypes.SEARCH_REQUEST, requestSearch),
]
