'use strict'
import React from 'react'
import { BACKEND_ENDPOINT } from '../constants'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Link, withRouter } from 'react-router-dom'

class EditContact extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            name: '',
            mobile: '',
            activity: '',
            email: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    notify(msg) {
        toast.success(msg, {
            position: toast.POSITION.TOP_CENTER
        })
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        this.fetchData(id);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})        
    }

    handleSubmit(event) {
        const { id, name, activity, mobile, email } = this.state

        axios.put( `${BACKEND_ENDPOINT}contacts/${id}` ,{
            "name": name,
            "activity" : activity,
            "mobile" : mobile,
            "email" : email
        })
        .then((response) => {
            this.notify("Atualizado!")
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
        event.preventDefault()
    }

    fetchData(id) {
        axios.get( `${BACKEND_ENDPOINT}contacts/${id}`)
            .then((response) => {
                if(response.statusText=="OK") {
                    return response.data
                } else {
                    throw new Error('Erro na consulta dos dados')
                }
            })
            .then((data) => {
                const { id, name, mobile, activity, email } = data
                this.setState({
                    id,
                    name,
                    mobile,
                    activity, 
                    email
                })
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    render() {
        return(
            <div>
                <Row>
                    <Col sm="12">
                        <h5><strong>Editar Contato</strong></h5>
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
                                    <Form.Label column sm={2}>Celular </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control
                                            type="text"
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
                                        <Button className="float-right" type="submit">Atualizar</Button>
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

export default withRouter(EditContact)