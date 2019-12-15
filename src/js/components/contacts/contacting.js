'use strict'
import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { BACKEND_ENDPOINT } from '../constants'

class Contacting extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            msg: 'Aguarde...'
        }
    }

    datenow() {
        let today = new Date()
        let dd = String(today.getDate()).padStart(2, '0')
        let mm = String(today.getMonth() + 1).padStart(2, '0')
        let hh = String(today.getHours()).padStart(2, '0')
        let min = String(today.getMinutes()).padStart(2, '0')
        let sec = String(today.getSeconds()).padStart(2, '0')
        let yyyy = today.getFullYear()
        return `${yyyy}-${mm}-${dd} ${hh}:${min}:${sec}`
    }

    componentDidMount(){
        const params = new URLSearchParams(this.props.location.search)
        const url_redirect = params.get('url')
        const contact_id = params.get('id')

        if (url_redirect) {
            axios.put( `${BACKEND_ENDPOINT}contacting/${contact_id}` ,{
                "last_contact": this.datenow()
            })
            .then((response) => {
                window.location.href = url_redirect
            })
            .catch((error) => {
                this.setState({ msg: `${error}` })
            })
        }    
    }

    render() {
        return (
            <p>{this.state.msg}</p>
        )
    }
}

export default withRouter(Contacting)