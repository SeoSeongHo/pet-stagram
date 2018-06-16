import {LoginActions, LoginTypes} from '../modules/login/loginState';
import {CardWriteActions, CardWriteTypes} from '../modules/card_write/CardWriteState';
import {CardDetailActions, CardDetailTypes} from '../modules/card_detail/CardDetailState';
// import {memoActions, memoTypes} from '../modules/memo/memoState';
import {UserProfileActions, UserProfileTypes} from '../modules/user_profile/UserProfileState';
import {PetProfileActions, PetProfileTypes} from '../modules/pet_profile/PetProfileState';
import {MainPageActions, MainPageTypes} from '../modules/main_page/MainPageState';
import {SearchActions,SearchTypes} from '../modules/search_page/SearchState'
import { MemoActions, MemoTypes } from '../modules/memo/memoState'
export {
  MainPageTypes,
  PetProfileTypes,
  LoginTypes,
  MemoTypes,
  CardWriteTypes,
  CardDetailTypes,
  UserProfileTypes,
  SearchTypes,
}
export default {
  ...MainPageActions,
  ...MemoActions,
  ...CardDetailActions,
  ...PetProfileActions,
  ...CardWriteActions,
  ...LoginActions,
  ...UserProfileActions,
  ...SearchActions,
};

