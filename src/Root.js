import React from 'react'
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import AppNavigator from './Router'
import reducer from './redux/reducer'
import AppWithNavigationState from './App'

import {
  View,
  Text
} from 'react-native'

const Root = () => {
  const {router} = AppNavigator
  const initialState = router.getStateForAction(router.getActionForPathAndParams('Home'))

  const navReducer = (state = initialState, action) => {
    const nextState = router.getStateForAction(action, state)

    return nextState || state
  }
  const appReducer = combineReducers({
    nav: navReducer,
    wekker: reducer,
  });
  const store = createStore(appReducer)
  return (
    <Provider store={store}>
      <AppWithNavigationState />
    </Provider>
  )
}

export default Root
