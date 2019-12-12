import React from 'react'
import { BACKEND_ENDPOINT } from '../constants'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'


class Contact extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            data: [],
            isLoading: false,
            error: null
        }
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

    render() {
        const { data } = this.state

        return (
            <Container>
                <Row style={{padding: '1rem'}}>
                    <Col>
                        <Link to="/contacts/new">Adicionar contato</Link>
                    </Col>
                    <Col>
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
                                        <Link to={`/contacts/${row.id}/edit`}>Editar</Link> | 
                                        <a target="_blank" href={`https://api.whatsapp.com/send?phone=${row.mobile}`}>Whatsapp</a> | 
                                        <a target="_blank" href={`mailto:${row.mobile}`}>Email</a>
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