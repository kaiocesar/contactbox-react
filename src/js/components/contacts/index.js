'use strict'

import React from 'react'
import { BACKEND_ENDPOINT, WHATSAPP_URL } from '../constants'
import axios from 'axios'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { FaWhatsapp, FaTrash, FaPen } from 'react-icons/fa'
import { IoMdMail } from 'react-icons/io'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'



class Contact extends React.Component {
    

    constructor(props){
        super(props)
        this.state = {
            data: [],
            isLoading: false,
            error: null
        }
        this.handleClick = this.handleClick.bind(this)
        
    }

    componentDidMount() {
        this.setState({ isLoading: true })

        axios.get(`${BACKEND_ENDPOINT}contacts`)
            .then((response)=>{
                if (response.statusText == "OK") {
                    return response.data
                } else {
                    console.log(response)
                    throw new Error(`Erro na consulta dos dados.`)
                    
                }
            })
            .then((data) => this.setState({ data: data, isLoading: false }))
            .catch((error) => {
                console.log(`Esse é o erro: ${error}`)
            })
    }


    deleteContact(id) {
        axios.delete( `${BACKEND_ENDPOINT}contacts/${id}` )
        .then((response) => {
            
            const newState = this.state
            const index = newState.data.findIndex(c => c.id === id)
            if(id === -1) return;
            newState.data.splice(index, 1)
            this.setState(newState)
            this.notify("Excluido!")
        })
        .catch((error) => {
            console.log(error)
        })
    }

    handleClick(id) {
        
        const optionConfirmation = {
            title: 'Confirmação',
            message: 'Você tem certeza que deseja deletar esse registro?',
            buttons: [
              {
                label: 'Sim',
                onClick: () => this.deleteContact(id)
              },
              {
                label: 'Não',
                onClick: () => console.log('out...')
              }
            ]
        }
        confirmAlert(optionConfirmation)
    }

    render() {
        const { data } = this.state
        
        return (
            <div>
                <Row style={{padding: '1rem'}}>
                    <Col sm="9">
                        <Button variant="primary" href="/contacts/new">Adicionar novo contato</Button>
                    </Col>
                    <Col sm="3">
                        <Form>
                            <Form.Row>
                                <Col>
                                    <Form.Control placeholder="Buscar" />
                                </Col>
                            </Form.Row>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col lg={true}>
                        <Table>
                            <thead>
                                <tr>                                
                                    <th>Nome</th>
                                    <th>Atividade</th>
                                    <th>Data do contato</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.map(row => (
                                    <tr key={row.id}>                                
                                        <td>{row.name}</td>
                                        <td>{row.activity}</td>
                                        <td>{row.last_contact}</td>
                                        <td align="right">
                                            <Button variant="link" href={`/contacts/${row.id}/edit`}>
                                                <FaPen />
                                            </Button>

                                            <Button variant="link" target="_blank" href={`${WHATSAPP_URL}${row.mobile}`}>
                                                <FaWhatsapp />
                                            </Button>

                                            <Button variant="link" target="_blank" href={`mailto:${row.mobile}`}>
                                                <IoMdMail />
                                            </Button>

                                            <Button variant="link">
                                                <FaTrash onClick={() => this.handleClick(row.id)} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {!data.length &&
                                <tr>
                                    <td colSpan="5">Nenhum registro foi encontrado.</td>
                                </tr>}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Contact