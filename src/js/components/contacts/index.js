import React from 'react'
import { BACKEND_ENDPOINT } from '../constants'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'


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

    handleClick(event) {
        console.log(event.target.value)
    }

    render() {
        const { data } = this.state

        return (
            <Container>
                <Row style={{padding: '1rem'}}>
                    <Col sm="10">
                        <Button variant="primary" href="/contacts/new">Adicionar novo contato</Button>
                    </Col>
                    <Col sm="2">
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
                                        <Button variant="link" href={`/contacts/${row.id}/edit`}>Editar</Button>

                                        <Button variant="link" target="_blank" href={`https://api.whatsapp.com/send?phone=${row.mobile}`}>Whatsapp</Button>

                                        <Button variant="link" target="_blank" href={`mailto:${row.mobile}`}>Email</Button>

                                        <Button variant="link" onClick={this.handleClick} value={row.id}>Deletar</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
            </Container>
        )
    }
}

export default Contact