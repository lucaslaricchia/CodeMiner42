import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';

import Home from './pages/Home';
import Register from './pages/Register';
import Landing from './pages/Landing';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/landing" component={Landing}/>
                <Route path="/register" component={Register}/>
            </Switch>
        </BrowserRouter>
    )
}