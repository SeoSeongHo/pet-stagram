import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from 'components/App'
import { HomePage } from 'components'
import loginView  from './modules/login/loginViewContainer'
import CardWriteView  from './modules/card_write/CardWriteViewContainer2'
import CardView  from './modules/main_page/cardView'
import UserProfileView  from './modules/user_profile/UserProfileViewContainer'
import PetProfileView  from './modules/pet_profile/PetProfileViewContainer'
import CardDetailView from './modules/card_detail/CardDetailViewContainer'
import SignUpView from 'modules/login/SignUpViewContainer'
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
    <switch>
      <Route exact path="/petProfile/:id" component={PetProfileView}/>
      <Route exact path="/petProfile/" component={PetProfileView}/>
    </switch>
    <Route path="/cardWrite" component={CardWriteView}/>
    <Route path="/cardDetail/:id" component={CardDetailView}/>
    <Route path="/signUp" component={SignUpView}/>
    <Route path="/search" component={SearchView}/>
  </Route>
)

export default routes
