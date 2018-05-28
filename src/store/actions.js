import {LoginActions, LoginTypes} from '../modules/login/loginState';
import {memoActions, memoTypes} from '../modules/memo/memoState';
import {UserProfileActions, UserProfileTypes} from '../modules/user_profile/UserProfileState';
export {
  LoginTypes,
  memoTypes,
  UserProfileTypes,
}
export default {
  ...LoginActions,
  ...memoActions,
  ...UserProfileActions,
};

