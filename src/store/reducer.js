import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import LoginReducer from '../modules/login/loginState'
import CardWriteReducer from '../modules/card_write/CardWriteState'
//import memoReducer from '../modules/memo/memoState'
import UserProfileReducer from '../modules/user_profile/UserProfileState'
import PetProfileReducer from '../modules/pet_profile/PetProfileState'
import CardDetailReducer from '../modules/card_detail/CardDetailState'
import MainPageReducer from '../modules/main_page/MainPageState'
import SearchReducer from '../modules/search_page/SearchState'
import memoReducer from '../modules/memo/memoState'
const reducers = {
  routing,
  form,
  memo: memoReducer,
  search: SearchReducer,
  main: MainPageReducer,
  cards: CardDetailReducer,
  pet: PetProfileReducer,
  Me: CardWriteReducer,
  login: LoginReducer,
  user: UserProfileReducer,
}


export default combineReducers(reducers)
