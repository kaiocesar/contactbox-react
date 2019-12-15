'use strict'

import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import  Contacts from '../contacts'
import NewContact from '../contacts/new'
import EditContact from '../contacts/edit'
import { FaBookOpen } from 'react-icons/fa'
import Contacting from '../contacts/contacting'

import {    
    BrowserRouter as Router,
    Route, 
    Switch
} from 'react-router-dom'

const MainContent = () => (
    <Router>
        <Container>
            <Row style={{padding: '1rem', borderBottom: '1px solid #CCC', textAlign:'center', marginBottom: "1rem"}}>
                <Col><h1><FaBookOpen /> Agenda</h1></Col>
            </Row>                
            
            <Switch>
                <Route path="/contacts/:id/edit">
                    <EditContact />
                </Route>
                <Route exact path="/contacts/new">
                    <NewContact />
                </Route>
                <Route exact path="/contacting">
                    <Contacting />
                </Route>
                <Route exact path="/">
                    <Contacts />
                </Route>
            </Switch>
        </Container>
    </Router>
)        
export default MainContent