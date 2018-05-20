import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from 'components/App'
import { HomePage } from 'components'
import loginView  from './modules/login/loginViewContainer'
import CardView  from './modules/main_page/cardView'
import UserProfileView  from './modules/user_profile/UserProfileViewContainer'
const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/login" component={loginView}/>
    <Route path="/homePage" component={CardView}/>
    <Route path="/userProfile" component={UserProfileView}/>
  </Route>
)

export default routes
