import {LoginActions, LoginTypes} from '../modules/login/loginState';
import {CardWriteActions, CardWriteTypes} from '../modules/card_write/CardWriteState';
// import {memoActions, memoTypes} from '../modules/memo/memoState';
import {UserProfileActions, UserProfileTypes} from '../modules/user_profile/UserProfileState';
import {PetProfileActions, PetProfileTypes} from '../modules/pet_profile/PetProfileState';
export {
  PetProfileTypes,
  LoginTypes,
  CardWriteTypes,
  UserProfileTypes,
}
export default {
  ...PetProfileActions,
  ...CardWriteActions,
  ...LoginActions,
  ...UserProfileActions,
};

