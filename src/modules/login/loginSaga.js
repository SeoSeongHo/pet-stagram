import { call, put, takeLatest } from 'redux-saga/effects'
import { setAuthenticationToken } from '../../utils/authentication'
import api from '../../utils/api'
import { LoginActions, LoginTypes } from './loginState'
import Constants from '../../constants/constants'
// import Storage, { KEYS } from '../../utils/petStagramStorage'
// import _ from 'lodash'

const { API_ROOT } = Constants;

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
      yield put(LoginActions.loginSuccess(token));
    }
  } catch (e) {
    yield put(LoginActions.loginFailure(e))
  }
}

function* requestSignup({ email, password,
                          username,userProfileImage,userBirthDay,petName, petProfileImage,petBirthDay }
                          : {email:string, password:string,
  username:string,userProfileImage:any,userBirthDay:any,petName:string, petProfileImage:any,petBirthDay:string }) {
  const body = {
    userEmail:email, password,
    username,userProfileImage,userBirthDay,petName, petProfileImage,petBirthDay
  }
  try {
    const token = yield api.get(`${API_ROOT}/register/`,body
    )
    if (token) {
      yield setAuthenticationToken(token,email,password);
      yield put(LoginActions.signUpSuccess(token))
    }
  } catch (e) {
    yield put(LoginActions.signUpFailure(e))
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
function* requestCreatePet({ petName,petProfileImage,petBirthDay }: { petName:string, petProfileImage:any, petBirthDay:any}) {

  try {
    const token = yield api.post(`${API_ROOT}/pet`,body
    )
    if (token) {
      yield put(LoginActions.createPetSuccess(token))
    }
  } catch (e) {
    yield put(LoginActions.createPetFailure(e))
  }
}

export const LoginSaga = [
  takeLatest(LoginTypes.LOGIN_REQUEST, requestLogin),
  takeLatest(LoginTypes.SIGN_UP_REQUEST, requestSignup),
  takeLatest(LoginTypes.CHECK_DUPLICATE_REQUEST, requestCheckDuplicate),
  takeLatest(LoginTypes.CREATE_PET_REQUEST, requestCreatePet),
]
