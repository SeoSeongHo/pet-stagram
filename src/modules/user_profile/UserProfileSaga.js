import { call, put, takeLatest } from 'redux-saga/effects'
import api from '../../utils/api'
import { UserProfileActions, UserProfileTypes } from './UserProfileState'
import {KEYS} from '../../utils/petStagramStorage'
import Storage from '../../utils/petStagramStorage'
import Constants from '../../constants/constants'
const { API_ROOT } = Constants;
function* requestGetUserProfile({ userEmail }: {userEmail: string}) {
  try {
    const token = yield api.get(`${API_ROOT}/user/${userEmail}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Token ${Storage.get(KEYS.accessToken)}`,
        }
      }
    );
    if (token) {
      console.log(token)
      yield put(UserProfileActions.getUserProfileSuccess(token))
    }
  } catch (e) {
    yield put(UserProfileActions.getUserProfileFailure(e))
  }
}

  function* requestGetUserFilter({ userEmail }: {userEmail: string}) {
    try {
      const token = yield api.get(`${API_ROOT}/userFilter?userEmail=${userEmail}`,{
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Token ${Storage.get(KEYS.accessToken)}`,
        }}
      );
      if (token) {
        console.log(token)
        yield put(UserProfileActions.getUserFilterSuccess(token))
      }
    } catch (e) {
      yield put(UserProfileActions.getUserFilterFailure(e))
    }
  }

function* requestEditIntroduce({ username,text, userBirthDay, userProfileImage }: {username:string, text:string, userBirthDay: any, userProfileImage: any}) {
  const formData = new FormData();
  const data = {
    username,
    introduceText:text,
    userBirthDay,
    userProfileImage
  };
  for(const key in data){
    console.log(key,'key');
    console.log(data[key],'data[key]');
    formData.append(key,data[key])
  }
  console.log(formData,"formData");
  try {
    const token = yield api.post(`${API_ROOT}/user/${Storage.get(KEYS.userEmail)}/edit`,formData, { isFormData: true }
    );
    if (token) {
      console.log(token)
      yield put(UserProfileActions.editUserProfileSuccess(token))
    }
  } catch (e) {
    yield put(UserProfileActions.editUserProfileFailure(e))
  }
}

function* requestFollow({ userEmail, followedName }: {username: string}) {
  const body = {
    followingName: followedName
  };

  try {
    const token = yield api.put(`${API_ROOT}/user`, body,{
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
function* requestUnFollow({ userEmail,followedName }: {username: string}) {
  const body = {
    followingName: followedName
  };

  try {
    const token = yield api.put(`${API_ROOT}/user`, body,{
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
    const token = yield api.get(`${API_ROOT}/user?userEmail=${followerName}&userEmail2=${followedName}`, body,{
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${Storage.get(KEYS.accessToken)}`,
      }}
    );
    if (token) {
      console.log(token);
      yield put(UserProfileActions.followCheckSuccess(token))
    }
  } catch (e) {
    yield put(UserProfileActions.followCheckFailure(e))
  }
}
function* requestPostPet({ petName, petProfileImage,petBirthDay,introduceText,owner}) {
  const formData = new FormData();
  const data = {
    petName,
    petProfileImage,
    petBirthDay,
    introduceText,
    owner
  };
  for(const key in data){
    console.log(key,'key');
    console.log(data[key],'data[key]');
    formData.append(key,data[key])
  }
  console.log(formData,"formData");
  try {
    const token = yield api.post(`${API_ROOT}/pet/`,formData, { isFormData: true }
    );
    if (token) {
      console.log(token)
      yield put(UserProfileActions.postPetSuccess(token))
    }
  } catch (e) {
    yield put(UserProfileActions.postPetFailure(e))
  }
}


export const UserProfileSaga = [
  takeLatest(UserProfileTypes.POST_PET_REQUEST, requestPostPet),
  takeLatest(UserProfileTypes.GET_USER_PROFILE_REQUEST, requestGetUserProfile),
  takeLatest(UserProfileTypes.GET_USER_FILTER_REQUEST, requestGetUserFilter),
  // takeLatest(UserPRofileTypes.SEND_MESSAGE_REQUEST, requestSendMessage),
  takeLatest(UserProfileTypes.FOLLOW_REQUEST, requestFollow),
  takeLatest(UserProfileTypes.UN_FOLLOW_REQUEST, requestUnFollow),
  takeLatest(UserProfileTypes.FOLLOW_CHECK_REQUEST, requestFollowCheck),
  takeLatest(UserProfileTypes.EDIT_USER_PROFILE_REQUEST, requestEditIntroduce),
];
