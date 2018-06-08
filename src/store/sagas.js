import { all } from 'redux-saga/effects'
import { LoginSaga } from '../modules/login/loginSaga'
import { UserProfileSaga } from '../modules/user_profile/UserProfileSaga'
import { PetProfileSaga } from '../modules/pet_profile/PetProfileSaga'
import { CardWriteSaga } from '../modules/card_write/CardWriteSaga'
import { CardDetailSaga } from '../modules/card_detail/CardDetailSaga'
import { MainPageSaga } from '../modules/main_page/MainPageSaga'
import { SearchSaga } from '../modules/search_page/SearchSaga'
function* mySaga(): any {
  yield all([
    ...SearchSaga,
    ...MainPageSaga,
    ...CardDetailSaga,
    ...PetProfileSaga,
    ...LoginSaga,
    ...CardWriteSaga,
    ...UserProfileSaga,
  ])
}

export default mySaga
