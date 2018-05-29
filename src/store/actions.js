import {LoginActions, LoginTypes} from '../modules/login/loginState';
import {CardWriteActions, CardWriteTypes} from '../modules/card_write/CardWriteState';
// import {memoActions, memoTypes} from '../modules/memo/memoState';
import {UserProfileActions, UserProfileTypes} from '../modules/user_profile/UserProfileState';
export {
  LoginTypes,
  CardWriteTypes,
  UserProfileTypes,
}
export default {
  ...CardWriteActions,
  ...LoginActions,
  ...UserProfileActions,
};

