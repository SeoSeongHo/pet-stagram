import { connect } from 'react-redux'
import _ from 'lodash'
import { compose, withHandlers } from 'recompose'
import actions from '../../store/actions';
import CardWriteView2 from './CardWriteView2'

export default connect(
  state => ({
    pets: _.get(state,["Me","pets"]),
    loading: _.get(state, ['Me', 'loading']),
  }),
  actions,
)(
  compose(
    withHandlers({
    }),
  )(
    CardWriteView2
  )
)
