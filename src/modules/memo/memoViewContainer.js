import { connect } from 'react-redux'
import _ from 'lodash'
import { compose, withHandlers } from 'recompose'
import actions from '../../store/actions';
import MemoView from './memoView'

export default connect(
  state => ({
    Memo: _.get(state,["memo","Memo"]),
  }),
  actions,
)(
  compose(
    withHandlers({
    }),
  )(
    MemoView
  )
)
