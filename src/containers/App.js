import React from 'react';
import { Switch, Route } from 'react-router';
import TopQuestions from './../views/TopQuestions';
import QuestionView from './../views/QuestionView';
import Sidebar from './../components/Sidebar';
import Header from './../components/Header';

function App() {
  return (
    <div className="App">
        <Header/>
        <div className="main-content">
            <Sidebar/>
            <Switch>
                <Route path="/question/:questionId" component={QuestionView}/>
                <Route path="/" component={TopQuestions}/>
            </Switch>
        </div>
    </div>
  );
}

export default App;
