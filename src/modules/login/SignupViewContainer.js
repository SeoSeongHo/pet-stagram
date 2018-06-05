import { connect } from 'react-redux'
import _ from 'lodash'
import { compose, withHandlers } from 'recompose'
import actions from '../../store/actions';
import SignupView from './SignupView'

export default connect(
  state => ({
    loading: _.get(state, ['login', 'loading']),
    error: _.get(state,['login','error'])
  }),
  actions,
)(
  compose(
  )(
    SignupView
  )
)
