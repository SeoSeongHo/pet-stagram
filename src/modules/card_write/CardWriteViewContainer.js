import { connect } from 'react-redux'
import _ from 'lodash'
import { compose, withHandlers } from 'recompose'
import actions from '../../store/actions';
import CardWriteView from './CardWriteView'

export default connect(
  state => ({
    userProfileImage: _.get(state,['user','userProfileImage']),
    isFollow: _.get(state,['user','isFollow']),
    userProfileName: _.get(state,['user','userProfileName']),
    introduceText: _.get(state,['user','introduceText']),
    petProfileImage: _.get(state,['user','petProfileImage']),
    userPicture: _.get(state,['user','userPicture']),
    userProfileCardId: _.get(state,['user','userProfileCardId']),
    petUsernames: _.get(state,['user','petUsernames']),
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
   CardWriteView
  )
)
