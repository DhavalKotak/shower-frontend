import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Navigation from "./components/Navigation"
import Header from "./components/Header"
import PlayList from './components/Playlist'
import About from './components/About'

class App extends Component {
    render() {
      return (
        <React.Fragment>
          <Router basename={window.location.pathname || ''}>
            <Navigation /><br/>
              <Switch>
                <Route exact path="/" component={Header}/>
                <Route path="/playlist" component={PlayList}/>
                <Route path="/about" component={About}/>
                <Route path="*" component={Header}/>
              </Switch>
            </Router>
        </React.Fragment>
      )
    }
}
export default App
