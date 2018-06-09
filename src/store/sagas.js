import { all } from 'redux-saga/effects'
import { LoginSaga } from '../modules/login/loginSaga'
import { UserProfileSaga } from '../modules/user_profile/UserProfileSaga'
import { PetProfileSaga } from '../modules/pet_profile/PetProfileSaga'
import { CardWriteSaga } from '../modules/card_write/CardWriteSaga'
import { CardDetailSaga } from '../modules/card_detail/CardDetailSaga'
import { MainPageSaga } from '../modules/main_page/MainPageSaga'
import { SearchSaga } from '../modules/search_page/SearchSaga'
import { MemoSaga } from '../modules/memo/memoSaga'
function* mySaga(): any {
  yield all([
    ...SearchSaga,
    ...MainPageSaga,
    ...CardDetailSaga,
    ...PetProfileSaga,
    ...LoginSaga,
    ...MemoSaga,
    ...CardWriteSaga,
    ...UserProfileSaga,
  ])
}

export default mySaga
