import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Board from './Board'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const Root = () => {
  return(
      <Router>
        <div>
          <Route exact={true} path='/' component={App} />
          <Route path='/:boardName/:uuid' component={Board} />
        </div>
      </Router>
  )
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
