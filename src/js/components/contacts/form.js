'use strict'
import React from 'react'
import Form from 'react-bootstrap/Form'

class ContactForm extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        <Form onSubmit={this.props.handleSubmit}>
            <Form.Group as={Row} controlId="iptCtrlNome">
                <Form.Label column sm={3}> Nome </Form.Label>
                <Col sm={9}>
                    <Form.Control
                        type="text" 
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="iptCtrlCelular">
                <Form.Label column sm={3}>Celular </Form.Label>
                <Col sm={9}>
                    <Form.Control
                        type="text"
                        name="mobile"
                        value={this.state.mobile}
                        onChange={this.handleChange} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="iptCtrlAtividade">
                <Form.Label column sm={3}>Atividade </Form.Label>
                <Col sm={9}>
                    <Form.Control
                        type="text"
                        name="activity"
                        value={this.state.activity}
                        onChange={this.handleChange} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="iptCtrlEmail">
                <Form.Label column sm={3}>Email </Form.Label>
                <Col sm={9}>
                    <Form.Control
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange} />
                </Col>
            </Form.Group>
            
            <Form.Group as={Row}>
                <Col sm={{ span: 9, offset: 3 }}>
                    <Button className="float-right" type="submit">Atualizar</Button>
                </Col>
            </Form.Group>
        </Form>
    }
}

export default ContactForm