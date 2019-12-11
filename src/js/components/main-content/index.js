'use strict'
import React from 'react'

import  Contacts from '../contacts'

import {    
    BrowserRouter as Router,
    Link,
    Route, 
    Switch
} from 'react-router-dom'


const MainContent = () => (
    <Router>
        <div>
            <ul>
                <li><Link to="/">Contacts</Link></li>
            </ul>
            <Switch>
                <Route path="/">
                    <Contacts />
                </Route>
            </Switch>
        </div>
    </Router>
)        
export default MainContent