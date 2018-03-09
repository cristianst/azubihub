import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';

const Page404 = () => (
    <div>404</div>
);

const PageOne = () => (
    <div>PageOne</div>
);

const AppRouter =  () => (
    <BrowserRouter>
        <Switch>
            <Route exact path={`${process.env.PUBLIC_URL}/`} component={App} />
            <Route path='/one' component={PageOne}/>
            <Route path='/two' />
            <Route component={Page404} />
        </Switch>
    </BrowserRouter>
);
//<Route path='*' component={} />
export default AppRouter;