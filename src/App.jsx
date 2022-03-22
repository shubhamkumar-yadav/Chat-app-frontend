import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import { Join } from './component/join/Join';
import { Chat } from './component/chat/Chat';
const App =()=>{
  return (<>
  <div className="App">
    <Router>
      <Route exact path='/' component={Join} />
      <Route exact path='/chat' component={Chat} />
    </Router>
  </div>
  </>);
};

export {App};
