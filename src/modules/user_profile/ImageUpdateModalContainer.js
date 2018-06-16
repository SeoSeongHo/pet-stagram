import { connect } from 'react-redux'
import _ from 'lodash'
import { compose, withHandlers } from 'recompose'
import actions from '../../store/actions';
import navigator from './ImageUpdateModal'
import { withRouter } from 'react-router-dom';

export default withRouter(connect(
  state => ({
  }),
  actions,
)(
  compose(
    withHandlers({
    }),
  )(
    navigator
  )
))
