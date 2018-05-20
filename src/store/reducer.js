import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import LoginReducer from '../modules/login/loginState'
import memoReducer from '../modules/memo/memoState'

const reducers = {
  routing,
  form,
  login: LoginReducer,
  memo: memoReducer,
}


export default combineReducers(reducers)
