import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import LoginReducer from '../modules/login/loginState'
import MemoReducer from '../modules/memo/memoState'

const reducers = {
  routing,
  form,
  login: LoginReducer,
  memo: MemoReducer,
}


export default combineReducers(reducers)
