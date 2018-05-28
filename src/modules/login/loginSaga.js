import { call, put, takeLatest } from 'redux-saga/effects'
import { setAuthenticationToken } from '../../utils/authentication'
import api from '../../utils/api'
import { LoginActions, LoginTypes } from './loginState'
import Constants from '../../constants/constants'
// import Storage, { KEYS } from '../../utils/petStagramStorage'
// import _ from 'lodash'

const { API_ROOT } = Constants

function* requestLogin({ username, password }: {username: string, password: string}) {
  const body = {
    username,
    password,
  }

  try {
    const token = yield api.post('http://127.0.0.1:8000/api-token-auth/', body
    )
    if (token) {
      console.log(token)
      yield setAuthenticationToken(token,username,password);
      yield put(LoginActions.loginSuccess(token))
    }
  } catch (e) {
    yield put(LoginActions.loginFailure(e))
  }
}


export const LoginSaga = [
  takeLatest(LoginTypes.LOGIN_REQUEST, requestLogin),
]
