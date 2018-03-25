import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './components/Main';
import ReportCreator from './components/ReportCreator';
import Page404 from './components/404.js';

const AppRouter =  () => (
    <BrowserRouter>
        <Switch>
            <Route exact path={`${process.env.PUBLIC_URL}/azubiyo/`} component={Main} />
            <Route path={`${process.env.PUBLIC_URL}/azubiyo/new`} component={ReportCreator}/>
            <Route component={Page404} />
        </Switch>
    </BrowserRouter>
);
//<Route path='*' component={} />
export default AppRouter;