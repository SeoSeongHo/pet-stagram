import { connect } from 'react-redux'
import _ from 'lodash'
import { compose, withHandlers } from 'recompose'
import actions from '../../store/actions';
import UserProfileView from './UserProfileView'

export default connect(
  state => ({
    userProfileImage: _.get(state,['user','userProfileImage']),
    isFollow: _.get(state,['user','isFollow']),
    userProfileName: _.get(state,['user','userEmail']),
    introduceText: _.get(state,['user','introduceText']),
    userBirth: _.get(state,['user','userBirth']),
    pets: _.get(state,['user', 'pets']),
    cards:_.get(state,['user','cards']),
    totalPost: _.get(state,['user','totalPost']),
    totalFollowing: _.get(state,['user','totalFollowing']),
    totalFollower: _.get(state,['user','totalFollower']),
    loading: _.get(state, ['registerUser', 'loading']),
  }),
  actions,
)(
  compose(
    withHandlers({
    }),
  )(
    UserProfileView
  )
)
