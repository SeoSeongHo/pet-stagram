import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from 'components/App'
import { HomePage } from 'components'
import loginView  from './modules/login/loginViewContainer'
import CardWriteView  from './modules/card_write/CardWriteViewContainer'
import CardView  from './modules/main_page/cardView'
import UserAndPetProfileTest  from './modules/user_profile/UserAndPetProfileTest'
import CardDetailView from './modules/card_detail/CardDetailView'
import SignUpView from 'modules/sign_up/SignUpView'
import SearchView from 'modules/search_page/SearchView'

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/login" component={loginView}/>
    <Route path="/homePage" component={CardView}/>
    <switch>
    <Route exact path="/userProfile/:userEmail" component={UserProfileView}/>
    <Route exact path="/userProfile/" component={UserProfileView}/>
    </switch>
    <Route path="/cardWrite" component={CardWriteView}/>
    <Route path="/cardDetail" component={CardDetailView}/>
    <Route path="/signUp" component={SignUpView}/>
    <Route path="/search" component={SearchView}/>
  </Route>
)

export default routes
