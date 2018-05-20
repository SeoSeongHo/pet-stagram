import {LoginActions, LoginTypes} from '../modules/login/loginState';
import {MemoActions, MemoTypes} from '../modules/memo/memoState';
export {
  LoginTypes,
  MemoTypes,
}
export default {
  ...LoginActions,
  ...MemoActions,
};
