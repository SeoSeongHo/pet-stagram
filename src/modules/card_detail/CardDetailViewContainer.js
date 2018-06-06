import { connect } from 'react-redux'
import _ from 'lodash'
import { compose, withHandlers } from 'recompose'
import actions from '../../store/actions';
import CardDetailView from './CardDetailView'

export default connect(
  state => ({
    pet: _.get(state,["cards","pet"]),
    owner: _.get(state,["cards","owner"]),
    title: _.get(state,["cards","title"]),
    picture: _.get(state,["cards","picture"]),
    text: _.get(state,["cards","text"]),
    like: _.get(state,["cards","like"]),
    created: _.get(state,["cards","created"]),
    comments: _.get(state,["cards","comments"]),
    loading: _.get(state, ['cards', 'loading']),
  }),
  actions,
)(
  compose(
    withHandlers({
    }),
  )(
    CardDetailView
  )
)
