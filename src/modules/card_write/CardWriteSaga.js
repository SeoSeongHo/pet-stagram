import { call, put, takeLatest } from 'redux-saga/effects'
import api from '../../utils/api'
import { CardWriteActions, CardWriteTypes } from './CardWriteState'
import {KEYS} from '../../utils/petStagramStorage'
import Storage from '../../utils/petStagramStorage'
import Constants from '../../constants/constants'
const { API_ROOT } = Constants;
function* requestGetPet({ username }: {username: string}) {
  try {
    const token = yield api.get(`${API_ROOT}/userPet/${username}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${Storage.get(KEYS.accessToken)}`,
      }}
    );
    if (token) {
      console.log(token)
      yield put(CardWriteActions.getPetSuccess(token))
    }
  } catch (e) {
    yield put(CardWriteActions.getPetFailure(e))
  }
}

function* requestPostCard({ pets,pictures,title,text }: {pets:number, pictures:Array, title:string, text:string}) {
  const formData = new FormData();
  const data = {
    pet_id:pets,
    title,
    text,
    pictures
  };
  for(const key in data){
    console.log(key,'key');
    console.log(data[key],'data[key]');
    if(key==='pictures'){
      _.each(pictures, function(i, file) {
        formData.append('file', i);
      });
    }
    else formData.append(key,data[key])
  }
  for(var pair of formData.entries()) {
    console.log(pair[0]+ ', '+ pair[1]);
  }
  try {
    const token = yield api.post(`${API_ROOT}/card/`, formData, { isFormData: true }
    );
    if (token) {
      yield put(CardWriteActions.postCardSuccess(token))
    }
  } catch (e) {
    yield put(CardWriteActions.postCardFailure(e))
  }
}

export const CardWriteSaga = [
  takeLatest(CardWriteTypes.GET_PET_REQUEST, requestGetPet),
  takeLatest(CardWriteTypes.POST_CARD_REQUEST, requestPostCard),
];
