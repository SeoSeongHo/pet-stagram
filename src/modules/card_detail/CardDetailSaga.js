import {call, put, takeLatest} from 'redux-saga/effects'
import api from '../../utils/api'
import {CardDetailActions, CardDetailTypes} from './CardDetailState'
import {KEYS} from '../../utils/petStagramStorage'
import Storage from '../../utils/petStagramStorage'
import Constants from '../../constants/constants'

const {API_ROOT} = Constants;

function* requestGetCard({cardId}: { cardId: string }) {
  try {
    const token = yield api.get(`${API_ROOT}/card/${cardId}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Token ${Storage.get(KEYS.accessToken)}`,
        }
      }
    );
    if (token) {
      console.log(token)
      yield put(CardDetailActions.getCardSuccess(token))
    }
  } catch (e) {
    yield put(CardDetailActions.getCardFailure(e))
  }
}

function* requestGetComment({cardId}: { cardId: string }) {
  try {
    const token = yield api.get(`${API_ROOT}/comment/${cardId}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Token ${Storage.get(KEYS.accessToken)}`,
        }
      }
    );
    if (token) {
      console.log(token)
      yield put(CardDetailActions.getCommentSuccess(token))
    }
  } catch (e) {
    yield put(CardDetailActions.getCommentFailure(e))
  }
}

function* requestDeleteComment({commentId}: { cardId: string }) {
  try {
    const token = yield api.delete(`${API_ROOT}/comment/${commentId}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Token ${Storage.get(KEYS.accessToken)}`,
        }
      }
    );
    if (token) {
      console.log(token)
      yield put(CardDetailActions.deleteCommentSuccess(token))
    }
  } catch (e) {
    yield put(CardDetailActions.deleteCommentFailure(e))
  }
}

function* requestDeleteCard({cardId}: { cardId: string }) {
  try {
    const token = yield api.delete(`${API_ROOT}/card/${cardId}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Token ${Storage.get(KEYS.accessToken)}`,
        }
      }
    );
    if (token) {
      console.log(token)
      yield put(CardDetailActions.getCardSuccess(token))
    }
  } catch (e) {
    yield put(CardDetailActions.getCardFailure(e))
  }
}

function* requestDeleteLike({cardId}: { cardId: string }) {
  try {
    const token = yield api.delete(`${API_ROOT}/like/${cardId}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Token ${Storage.get(KEYS.accessToken)}`,
        }
      }
    );
    if (token) {
      console.log(token)
      yield put(CardDetailActions.deleteLikeSuccess(token))
    }
  } catch (e) {
    yield put(CardDetailActions.deleteLikeFailure(e))
  }
}

function* requestPostLike({cardId}: { cardId: string }) {
  const body = {
    cardId
  }
  try {
    const token = yield api.put(`${API_ROOT}/like`, body, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Token ${Storage.get(KEYS.accessToken)}`,
        }
      }
    );
    if (token) {
      console.log(token)
      yield put(CardDetailActions.postLikeSuccess(token))
    }
  } catch (e) {
    yield put(CardDetailActions.postLikeFailure(e))
  }
}

function* requestPostComment({cardId, comment}: { cardId: string }) {
  const body = {
    card_id:cardId,
    comment,
    user_email: Storage.get(KEYS.userEmail)
  }
  try {
    const token = yield api.post(`${API_ROOT}/comment/`, body, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Token ${Storage.get(KEYS.accessToken)}`,
        }
      }
    );
    if (token) {
      console.log(token)
      yield put(CardDetailActions.postCommentSuccess(token))
    }
  } catch (e) {
    yield put(CardDetailActions.postCommentFailure(e))
  }
}

export const CardDetailSaga = [
  takeLatest(CardDetailTypes.GET_CARD_REQUEST, requestGetCard),
  takeLatest(CardDetailTypes.GET_COMMENT_REQUEST, requestGetComment),
  takeLatest(CardDetailTypes.DELETE_CARD_REQUEST, requestDeleteCard),
  takeLatest(CardDetailTypes.DELETE_COMMENT_REQUEST, requestDeleteComment),
  takeLatest(CardDetailTypes.DELETE_LIKE_REQUEST, requestDeleteLike),
  takeLatest(CardDetailTypes.POST_LIKE_REQUEST, requestPostLike),
  takeLatest(CardDetailTypes.POST_COMMENT_REQUEST, requestPostComment),
];
