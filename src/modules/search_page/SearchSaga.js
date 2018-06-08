import { call, put, takeLatest } from 'redux-saga/effects'
import { setAuthenticationToken } from '../../utils/authentication'
import api from '../../utils/api'
import { SearchActions, SearchTypes } from './SearchState'
import Constants from '../../constants/constants'
// import Storage, { KEYS } from '../../utils/petStagramStorage'
// import _ from 'lodash'

const { API_ROOT } = Constants

function* requestGetCard({query}) {
  try {
    const token = yield api.get(`${API_ROOT}/card/${query}`
    )
    if (response) {
      yield put(SearchActions.getCardListSuccess(token))
    }
  } catch (e) {
    yield put(SearchActions.getCardListFailure(e))
  }
}
export const SearchSaga = [
  takeLatest(SearchTypes.GET_CARD_LIST_REQUEST, requestGetCard)
]
