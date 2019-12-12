import React from 'react'

import { Link } from 'react-router-dom'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios'

function createData(id, date, name, shipTo, paymentMethod, amount) {
    return { id, date, name, shipTo, paymentMethod, amount };
}
const rows = [
    createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
    createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
    createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
    createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
    createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
  ];
  
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