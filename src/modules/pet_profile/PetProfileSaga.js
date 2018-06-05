import { call, put, takeLatest } from 'redux-saga/effects'
import api from '../../utils/api'
import { PetProfileActions, PetProfileTypes } from './PetProfileState'
import {KEYS} from '../../utils/petStagramStorage'
import Storage from '../../utils/petStagramStorage'
import Constants from '../../constants/constants'
const { API_ROOT } = Constants;
function* requestGetPetProfile({ Id }: {Id: any}) {
  try {
    const token = yield api.get(`${API_ROOT}/pet/${Id}`,{
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${Storage.get(KEYS.accessToken)}`,
      }}
    );
    if (token) {
      console.log(token)
      yield put(PetProfileActions.getPetProfileSuccess(token))
    }
  } catch (e) {
    yield put(PetProfileActions.getPetProfileFailure(e))
  }
}

function* requestEditPetProfile({ id, text, petBirth, petProfileImage }: {id: any, text:string, petBirth: any, petProfileImage: any}) {
  const body={
    petProperty:text,
    petBirth,
    petProfileImage
  };
  try {
    const token = yield api.put(`${API_ROOT}/pet/${id}`,body,{
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${Storage.get(KEYS.accessToken)}`,
      }}
    );
    if (token) {
      console.log(token)
      yield put(PetProfileActions.editPetProfileSuccess(body))
    }
  } catch (e) {
    yield put(PetProfileActions.editPetProfileFailure(e))
  }
}

export const PetProfileSaga = [
  takeLatest(PetProfileTypes.GET_PET_PROFILE_REQUEST, requestGetPetProfile),
  takeLatest(PetProfileTypes.EDIT_PET_PROFILE_REQUEST, requestEditPetProfile),
];
