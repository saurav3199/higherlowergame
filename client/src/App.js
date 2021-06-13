import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";

import Game from "./containers/Game";
import Home from "./containers/Home";

const App = () => {

  return (
    <Router>
        <Route path="/game/:gameId" component={Game} />
        <Route path="/" exact component={Home} />
    </Router>
  )
}

export default App;
