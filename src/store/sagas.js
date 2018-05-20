import { all } from 'redux-saga/effects'
import { LoginSaga } from '../modules/login/loginSaga'
import { MemoSaga } from '../modules/memo/memoSaga'

function* mySaga(): any {
  yield all([
    ...LoginSaga,
    ...MemoSaga,
  ])
}

export default mySaga
