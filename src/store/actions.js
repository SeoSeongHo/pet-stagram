import {LoginActions, LoginTypes} from '../modules/login/loginState';
import {memoActions, memoTypes} from '../modules/memo/memoState';
export {
  LoginTypes,
  memoTypes,
}
export default {
  ...LoginActions,
  ...memoActions,
};

