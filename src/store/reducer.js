import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import LoginReducer from '../modules/login/loginState'
import CardWriteReducer from '../modules/card_write/CardWriteState'
//import memoReducer from '../modules/memo/memoState'
import UserProfileReducer from '../modules/user_profile/UserProfileState'
const reducers = {
  routing,
  form,
  Me: CardWriteReducer,
  login: LoginReducer,
  User: UserProfileReducer,
}


export default combineReducers(reducers)
