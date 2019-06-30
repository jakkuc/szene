import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import {Route, Router} from 'react-router';
import history from './history'

const jakobsDefaultCategories = [8, 54, 82, 120, 40, 47, 51].map((x: any) => x.toString());

const routing = (
    <Router history={history}>
            <Route exact path="/" component={() => <App useCookies={true}/>}/>
            <Route exact path="/jakob" component={() => <App categoryIds={jakobsDefaultCategories} useCookies={false}/>}/>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
