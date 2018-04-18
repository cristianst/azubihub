import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './components/Main';
import ReportCreator from './components/ReportCreator';
import Report from './components/Report';
import Page404 from './components/404.js';

//App Router for GH Pages
/*const AppRouter =  () => (
    <BrowserRouter>
        <Switch>
            <Route exact path={`${process.env.PUBLIC_URL}/`} component={Main} />
            <Route path={`${process.env.PUBLIC_URL}/azubiyo/new`}  component={ReportCreator}/>
            <Route component={Page404} />
        </Switch>
    </BrowserRouter>
); */

const AppRouter =  () => (
    <BrowserRouter>
        <Switch>
            <Route exact path={`${process.env.PUBLIC_URL}/`} component={Main} />
            <Route path='/new' component={ReportCreator}/>
            <Route path='/reports/:id' component={Report}/>
            <Route component={Page404} />
        </Switch>
    </BrowserRouter>
);


//<Route path='*' component={} />
export default AppRouter;