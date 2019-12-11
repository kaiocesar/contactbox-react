'use strict'
import React from 'react'
import Container from '@material-ui/core/Container';
import  Contacts from '../contacts'
import NewContact from '../contacts/new'

import {    
    BrowserRouter as Router,
    Route, 
    Switch
} from 'react-router-dom'

const MainContent = () => (
    <Router>
        <Container fixed>                    
            <Switch>
                <Route exact path="/novo">
                    <NewContact />
                </Route>
                <Route exact path="/">
                    <Contacts />
                </Route>
            </Switch>
        </Container>
    </Router>
)        
export default MainContent