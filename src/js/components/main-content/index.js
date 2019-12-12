'use strict'
import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import  Contacts from '../contacts'
import NewContact from '../contacts/new'
import EditContact from '../contacts/edit'

import {    
    BrowserRouter as Router,
    Route, 
    Switch
} from 'react-router-dom'

const MainContent = () => (
    <Router>
        <Container>
            <Row style={{paddingBottom: '1rem', borderBottom: '1px solid #CCC', textAlign:'center'}}>
                <h1>Agenda</h1>
            </Row>                
            <Row>
                <Switch>
                    <Route path="/contacts/:id/edit">
                        <EditContact />
                    </Route>
                    <Route exact path="/contacts/new">
                        <NewContact />
                    </Route>
                    <Route exact path="/">
                        <Contacts />
                    </Route>
                </Switch>
            </Row>
        </Container>
    </Router>
)        
export default MainContent