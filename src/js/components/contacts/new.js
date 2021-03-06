'use strict'

import React from 'react'
import { BACKEND_ENDPOINT } from '../constants'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'
import InputMask from 'react-input-mask'

class NewContact extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            name: '',
            mobile: '',
            activity: '',
            email: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    notify(msg, tipo) {
        if (tipo=="error") {
            toast.error(msg, {
                position: toast.POSITION.TOP_CENTER
            })
        } else {
            toast.success(msg, {
                position: toast.POSITION.TOP_CENTER
            })
        }
    }

    resetFields() {
        this.setState({
            name: '',
            mobile: '',
            activity: '',
            email: ''
        })
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})        
    }

    handleSubmit(event) {
        const { name, activity, mobile, email } = this.state

        axios.post( `${BACKEND_ENDPOINT}contacts` ,{
            "name": name,
            "activity" : activity,
            "mobile" : mobile,
            "email" : email,            
            "status": true
        })
        .then((response) => {
            this.resetFields()
            this.notify("Adicionado!", "sucess")
        })
        .catch((error) => {
            if("response" in error.request){
                let errors = JSON.parse(error.request.response)
                let txtError = ''
                for(let erro in errors) {
                    txtError += `<li>{errors[erro]}</li>`;
                }                                
                this.notify(txtError, "error")
            }
            
            
        })
        event.preventDefault()
    }

    render() {
        return (
            <div>
                <Row>
                    <Col sm="12">
                        <h5><strong>Novo contato</strong></h5>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12">
                        <br/>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group as={Row} controlId="iptCtrlNome">
                                <Form.Label column sm={2}> Nome </Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        type="text" 
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.handleChange} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="iptCtrlCelular">
                                <Form.Label column sm={2}> Celular </Form.Label>
                                <Col sm={10}>
                                    <InputMask
                                        className="form-control" 
                                        mask="+55 99 99999-9999" 
                                        maskChar=" " 
                                        name="mobile" 
                                        value={this.state.mobile} 
                                        onChange={this.handleChange} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="iptCtrlAtividade">
                                <Form.Label column sm={2}>Atividade </Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        type="text"
                                        name="activity"
                                        value={this.state.activity}
                                        onChange={this.handleChange} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="iptCtrlEmail">
                                <Form.Label column sm={2}>Email </Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleChange} />
                                </Col>
                            </Form.Group>
                            
                            <Form.Group as={Row}>
                                <Col sm="3">
                                <br/>
                                    <Link to="/">Voltar</Link>
                                </Col>
                                <Col sm="9">
                                    <Button className="float-right" type="submit">Cadastrar</Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <ToastContainer />
            </div>
        )
    }
}

export default NewContact