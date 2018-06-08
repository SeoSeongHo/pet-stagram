import { connect } from 'react-redux'
import _ from 'lodash'
import { compose, withHandlers } from 'recompose'
import actions from '../../store/actions';
import SearchView from './SearchView'


export default connect(
  state => ({
    cards: _.get(state, ['search', 'cards']),
  }),
  actions,
)(
  compose(
    withHandlers({
    }),
  )(
    SearchView
  )
)
