import React from 'react'

import { Link } from 'react-router-dom'

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
            <div>
                <React.Fragment>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Contacts
                </Typography>
                
                <div>
                    <Link to="/novo" variant="contained" color="primary" href="/novo">Add new</Link>
                </div>

                <Table size="small">
                    <TableHead>
                    <TableRow>
                        <TableCell>Contact</TableCell>
                        <TableCell>Last contact date</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.map(row => (
                        <TableRow key={row.id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.last_contact}</TableCell>
                        <TableCell align="right">{row.mobile}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                
                </React.Fragment>
            </div>
            
        )
    }
}

export default Contact