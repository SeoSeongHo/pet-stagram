import { call, put, takeLatest } from 'redux-saga/effects'
import { setAuthenticationToken } from '../../utils/authentication'
import api from '../../utils/api'
import { LoginActions, LoginTypes } from './loginState'
import Constants from '../../constants/constants'
// import Storage, { KEYS } from '../../utils/petStagramStorage'
// import _ from 'lodash'

const { API_ROOT } = Constants

function* requestLogin({ userEmail, password }: {userEmail: string, password: string}) {
  const body = {
    userEmail,
    password,
  }

  try {
    const token = yield api.post(`${API_ROOT}/user/${userEmail}`, body
    )
    if (token) {
      console.log(token)
      yield setAuthenticationToken(token,userEmail,password);
      yield put(LoginActions.loginSuccess(token))
    }
  } catch (e) {
    yield put(LoginActions.loginFailure(e))
  }
}

function* requestSignup({ userEmail, password }: {userEmail: string, password: string}) {
  const body = {
    userEmail,
    password,
  }
  try {
    const token = yield api.get(`${API_ROOT}/register/`,body
    )
    if (token) {
      yield setAuthenticationToken(token,username,password);
      yield put(LoginActions.signUpSuccess(token))
    }
  } catch (e) {
    yield put(LoginActions.signupFailure(e))
  }
}

function* requestCheckDuplicate({ userEmail }: {userEmail: string}) {
  try {
    const token = yield api.get(`${API_ROOT}/user/${userEmail}`
    )
    if (token) {
      yield put(LoginActions.checkDuplicateSuccess(token))
    }
  } catch (e) {
    yield put(LoginActions.checkDuplicateFailure(e))
  }
}


export const LoginSaga = [
  takeLatest(LoginTypes.LOGIN_REQUEST, requestLogin),
  takeLatest(LoginTypes.SIGNUP_REQUEST, requestSignup),
  takeLatest(LoginTypes.CHECK_DUPLICATE_REQUEST, requestCheckDuplicate),
]
