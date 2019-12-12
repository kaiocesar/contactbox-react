'use strict'
import React from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

class EditContact extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            mobile: '',
            activity: '',
            email: ''
        }
        
    }

    componentDidMount(){
        
    }

    render() {
        
        
        return(
            <Container>
                <Row>
                    <h4>Editar Contato</h4>
                    <Link className="float-right" to="/">Voltar</Link>
                </Row>
                <Row>
                    <Form>
                        <Form.Group as={Row} controlId="formHorizontalNome">
                            <Form.Label column sm={2}>
                            Nome
                            </Form.Label>
                            <Col sm={10}>
                            <Form.Control type="text" placeholder="Nome" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formHorizontalCelular">
                            <Form.Label column sm={2}>
                            Celular
                            </Form.Label>
                            <Col sm={10}>
                            <Form.Control type="text" placeholder="Celular" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalAtividade">
                            <Form.Label column sm={2}>
                            Atividade
                            </Form.Label>
                            <Col sm={10}>
                            <Form.Control type="text" placeholder="Atividade" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                            Email
                            </Form.Label>
                            <Col sm={10}>
                            <Form.Control type="email" placeholder="Email" />
                            </Col>
                        </Form.Group>
                        
                        <Form.Group as={Row}>
                            <Col sm={{ span: 10, offset: 2 }}>
                            <Button type="submit">Cadastrar</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Row>
            </Container>
        )

    }
}

export default EditContact