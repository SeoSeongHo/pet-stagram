import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import LoginReducer from '../modules/login/loginState'
import CardWriteReducer from '../modules/card_write/CardWriteState'
//import memoReducer from '../modules/memo/memoState'
import UserProfileReducer from '../modules/user_profile/UserProfileState'
import PetProfileReducer from '../modules/pet_profile/PetProfileState'
const reducers = {
  routing,
  form,
  pet: PetProfileReducer,
  Me: CardWriteReducer,
  login: LoginReducer,
  user: UserProfileReducer,
}


export default combineReducers(reducers)
