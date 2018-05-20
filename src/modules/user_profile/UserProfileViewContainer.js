import { connect } from 'react-redux'
import _ from 'lodash'
import { compose, withHandlers } from 'recompose'
import actions from '../../store/actions';
import UserProfileView from './UserProfileView'

export default connect(
  state => ({
    loading: _.get(state, ['registerUser', 'loading']),
  }),
  actions,
)(
  compose(
    withHandlers({
      onLoginPressed: (props) => (username, password) => {
        props.loginRequest(username, password).then(()=>{
          this.props.history.push('/UserProfile')
        }).catch((e)=>console.log(e));
      },
    }),
  )(
    UserProfileView
  )
)
