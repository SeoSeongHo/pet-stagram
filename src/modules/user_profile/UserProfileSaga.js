import { call, put, takeLatest } from 'redux-saga/effects'
import api from '../../utils/api'
import { UserProfileActions, UserProfileTypes } from './UserProfileState'
import {KEYS} from '../../utils/petStagramStorage'
import Storage from '../../utils/petStagramStorage'
import Constants from '../../constants/constants'
const { API_ROOT } = Constants;
function* requestGetUserProfile({ username }: {username: string}) {
  const body = {
    username,
  };

  try {
    const token = yield api.post(`${API_ROOT}/userProfile/`, body,{
      headers: {
        Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Token ${Storage.get(KEYS.accessToken)}`,
      }}
    );
    if (token) {
      console.log(token)
      yield put(UserProfileActions.getUserProfileSuccess(token))
    }
  } catch (e) {
    yield put(UserProfileActions.getUserProfileFailure(e))
  }
}

function* requestFollow({ username }: {username: string}) {
  const body = {
    username,
  };

  try {
    const token = yield api.post(`${API_ROOT}/follow/`, body,{
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${Storage.get(KEYS.accessToken)}`,
      }}
    );
    if (token) {
      console.log(token)
      yield put(UserProfileActions.followSuccess(token))
    }
  } catch (e) {
    yield put(UserProfileActions.followFailure(e))
  }
}
function* requestUnFollow({ username }: {username: string}) {
  const body = {
    username,
  };

  try {
    const token = yield api.post(`${API_ROOT}/unFollow/`, body,{
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${Storage.get(KEYS.accessToken)}`,
      }}
    );
    if (token) {
      console.log(token)
      yield put(UserProfileActions.unFollowSuccess(token))
    }
  } catch (e) {
    yield put(UserProfileActions.unFollowFailure(e))
  }
}

function* requestFollowCheck({ followerName, followedName }: {followerName: string, followedName:string}) {
  const body = {
    followerName,
    followedName
  };

  try {
    const token = yield api.get(`${API_ROOT}/Follow/`, body,{
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${Storage.get(KEYS.accessToken)}`,
      }}
    );
    if (token) {
      console.log(token)
      yield put(UserProfileActions.followCheckSuccess(token))
    }
  } catch (e) {
    yield put(UserProfileActions.followCheckFailure(e))
  }
}

export const UserProfileSaga = [
  takeLatest(UserProfileTypes.GET_USER_PROFILE_REQUEST, requestGetUserProfile),
 // takeLatest(UserPRofileTypes.SEND_MESSAGE_REQUEST, requestSendMessage),
  takeLatest(UserProfileTypes.FOLLOW_REQUEST, requestFollow),
  takeLatest(UserProfileTypes.UN_FOLLOW_REQUEST, requestUnFollow),
  takeLatest(UserProfileTypes.FOLLOW_CHECK_REQUEST, requestFollowCheck),
];
