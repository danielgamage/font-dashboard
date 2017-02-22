import React from 'react'
import ReactDOM from 'react-dom'
import App from '../components/App'
import '../index.css'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from '../reducers'


it('renders without crashing', () => {
  const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  const div = document.createElement('div')
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  )
})
