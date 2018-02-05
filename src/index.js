import 'normalize.css/normalize.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'font-awesome/css/font-awesome.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Root from './components/Root/Root';
import SignIn from './components/SignIn/SignIn';
import NotFound from './components/NotFound/NotFound';

import store from './store';
import { Provider } from 'react-redux';

const Output = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/signin" component={ SignIn } />
                <Route path="/" component={ Root }  />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
};


ReactDOM.render(
    <Provider store={ store }>
        <Output />
    </Provider>, 
    document.getElementById('root'));

