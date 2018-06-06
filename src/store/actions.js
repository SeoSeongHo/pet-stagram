import {LoginActions, LoginTypes} from '../modules/login/loginState';
import {CardWriteActions, CardWriteTypes} from '../modules/card_write/CardWriteState';
import {CardDetailActions, CardDetailTypes} from '../modules/card_detail/CardDetailState';
// import {memoActions, memoTypes} from '../modules/memo/memoState';
import {UserProfileActions, UserProfileTypes} from '../modules/user_profile/UserProfileState';
import {PetProfileActions, PetProfileTypes} from '../modules/pet_profile/PetProfileState';
export {
  PetProfileTypes,
  LoginTypes,
  CardWriteTypes,
  CardDetailTypes,
  UserProfileTypes,
}
export default {
  ...CardDetailActions,
  ...PetProfileActions,
  ...CardWriteActions,
  ...LoginActions,
  ...UserProfileActions,
};

