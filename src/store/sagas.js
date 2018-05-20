import { all } from 'redux-saga/effects'
import { LoginSaga } from '../modules/login/loginSaga'
import { memoSaga } from '../modules/memo/memoSaga'

function* mySaga(): any {
  yield all([
    ...LoginSaga,
    ...memoSaga,
  ])
}

export default mySaga
