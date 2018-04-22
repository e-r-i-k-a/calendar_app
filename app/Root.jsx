import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect, Link} from 'react-router-dom';
import NavBar from './components/NavBar';
import store from './store'
import Home from './components/Home'
import DateComponent from './components/DateComponent'

render(
  <Provider store={store}>
    <Router>
      <div className = 'app'>
        <nav>
          <NavBar />
        </nav>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/:month/:date' component={DateComponent} />
          <Redirect to='/' />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
)
