'use strict'
import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { BACKEND_ENDPOINT } from '../constants'
import { datenow } from '../helper'

class Contacting extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            msg: 'Aguarde...'
        }
    }

    componentDidMount(){
        const params = new URLSearchParams(this.props.location.search)
        const url_redirect = params.get('url')
        const contact_id = params.get('id')

        if (url_redirect) {
            axios.put( `${BACKEND_ENDPOINT}contacting/${contact_id}`)
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