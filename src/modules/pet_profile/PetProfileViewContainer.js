import { connect } from 'react-redux'
import _ from 'lodash'
import { compose, withHandlers } from 'recompose'
import actions from '../../store/actions';
import PetProfileView from './PetProfileView'

export default connect(
  state => ({
    petProfileImage: _.get(state,['pet','petProfileImage']),
    petName: _.get(state,['pet','petName']),
    id: _.get(state,['pet','id']),
    petBirthDay: _.get(state,['pet','petBirthDay']),
    petProperty: _.get(state,['pet','petProperty']),
    users: _.get(state,['pet', 'users']),
    loading: _.get(state, ['pet', 'loading']),
  }),
  actions,
)(
  compose(
    withHandlers({
    }),
  )(
    PetProfileView
  )
)
