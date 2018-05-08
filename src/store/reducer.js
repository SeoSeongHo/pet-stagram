import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import LoginReducer from '../modules/login/loginState'

const reducers = {
  routing,
  form,
  login: LoginReducer,
}


export default combineReducers(reducers)
