import { all } from 'redux-saga/effects'
import { LoginSaga } from '../modules/login/loginSaga'
import { memoSaga } from '../modules/memo/memoSaga'
import { UserProfileSaga } from '../modules/user_profile/UserProfileSaga'

function* mySaga(): any {
  yield all([
    ...LoginSaga,
    ...memoSaga,
    ...UserProfileSaga,
  ])
}

export default mySaga
