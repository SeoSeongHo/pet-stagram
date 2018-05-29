import { all } from 'redux-saga/effects'
import { LoginSaga } from '../modules/login/loginSaga'
//import { memoSaga } from '../modules/memo/memoSaga'
import { UserProfileSaga } from '../modules/user_profile/UserProfileSaga'
import { CardWriteSaga } from '../modules/card_write/CardWriteSaga'
function* mySaga(): any {
  yield all([
    ...LoginSaga,
    ...CardWriteSaga,
    ...UserProfileSaga,
  ])
}

export default mySaga
