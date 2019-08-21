import React, { Component } from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import LandingPage from './Components/Submit';
import MessageBoard from './Components/ViewBoard';

class App extends Component{
  render(){
    return(
      <Router>
        <div className="App">
          <div className="container">
            <Route exact path="/" component={LandingPage}/>
            <Route exact path="/view-all" component={MessageBoard} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
