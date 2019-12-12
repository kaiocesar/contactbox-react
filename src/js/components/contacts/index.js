import React from 'react'

import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Image from 'react-bootstrap/Image'

import axios from 'axios'


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
        axios.get('http://localhost:8000/api/contacts')
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
            <Table>
                <thead>
                    <th></th>
                    <th>Name</th>
                    <th>Activity</th>
                    <th>Last contact</th>
                    <th></th>
                </thead>

                <tbody>
                    {data.map(row => (
                        <tr key={row.id}>
                        <td>
                        <Col xs={6} md={4}>
                            <Image src="holder.js/171x180" roundedCircle />
                        </Col>
                        </td>
                        <td>{row.name}</td>
                        <td>{row.activity}</td>
                        <td>{row.last_contact}</td>
                        <td align="right">
                            <Link to={`/contacts/${row.id}`}>Edit</Link> | 
                            <a target="_blank" href={`https://api.whatsapp.com/send?phone=${row.mobile}`}>Whatsapp</a> | 
                            <a target="_blank" href={`mailto:${row.mobile}`}>Email</a>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )
    }
}

export default Contact