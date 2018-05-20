import { connect } from 'react-redux'
import _ from 'lodash'
import { compose, withHandlers } from 'recompose'
import actions from '../../store/actions';
import memoView from './memoView'

export default connect(
  state => ({
    loading: _.get(state, ['memo', 'loading']),
    memo:_.get(state,['memo','memo']),
    dogs:_.get(state,['memo','dogs'])
  }),
  actions,
)(
  compose(
  )(
    memoView
  )
)
