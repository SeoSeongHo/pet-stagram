import { connect } from 'react-redux'
import _ from 'lodash'
import { compose, withHandlers } from 'recompose'
import actions from '../../store/actions';
import LoginView from './loginView'


export default connect(
  state => ({
    loading: _.get(state, ['registerUser', 'loading']),
  }),
  actions,
)(
  compose(
    withHandlers({
      onLoginPressed: (props) => (username, password) => {
        props.loginRequest(username, password)
      },
    }),
  )(
    LoginView
  )
)
