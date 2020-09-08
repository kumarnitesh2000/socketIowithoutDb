import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Join from './Join'
import Chat from './Chat'

const App = () =>{


return(


   <Router>
      <Switch>
         <Route path="/" exact component={Join}></Route>
         <Route path="/chat" component={Chat}></Route>
      </Switch>
   </Router>



);

}

export default App;
