import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import {Route, Switch} from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom';

const jakobsDefaultCategories = [115, 116, 117, 8, 3, 131, 92, 82, 40, 47, 51, 52].map((x: any) => x.toString());

const routing = (
    <Router basename={process.env.PUBLIC_URL}>
        <Switch>
            <Route exact path="/" component={() => <App useCookies={true}/>}/>
            <Route exact path="/jakob" component={() => <App categoryIds={jakobsDefaultCategories} useCookies={false}/>}/>
        </Switch>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
