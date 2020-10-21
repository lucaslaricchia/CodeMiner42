import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';

import Home from './pages/Home';
import Register from './pages/Register';
import Landing from './pages/Landing';
import UpdateLocation from './pages/UpdateLocation';
import TradePage from './pages/TradePage';
import FlagInfected from './pages/FlagInfected';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/landing" component={Landing}/>
                <Route path="/register" component={Register}/>
                <Route path="/update" component={UpdateLocation}/>
                <Route path="/flaginfected" component={FlagInfected}/>
                <Route path="/trade" component={TradePage}/>
            </Switch>
        </BrowserRouter>
    )
}