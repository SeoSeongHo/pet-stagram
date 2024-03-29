import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk';
import createReduxWaitForMiddleware from 'redux-wait-for-action'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer'
import sagas from './sagas'

const configureStore = initialState => {
  const hasWindow = typeof window !== 'undefined'
  const sagaMiddleware = createSagaMiddleware()
  const logger = createLogger()
  const waitForMiddleware = createReduxWaitForMiddleware();
  const finalCreateStore = compose(
    applyMiddleware(logger, thunkMiddleware, sagaMiddleware, waitForMiddleware),
    hasWindow && window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )(createStore)

  const store = finalCreateStore(reducer, initialState)
  let sagaTask = sagaMiddleware.run(sagas)

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextReducer = require('./reducer').default
      store.replaceReducer(nextReducer)
    })
    module.hot.accept('./sagas', () => {
      const nextSagas = require('./sagas').default
      sagaTask.cancel()
      sagaTask.done.then(() => {
        sagaTask = sagaMiddleware.run(nextSagas)
      })
    })
  }

  return store
}

export default configureStore
