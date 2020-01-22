import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

export class logoutCabinet extends Component {
    displayName = logoutCabinet.name

    constructor(props) {
        super(props)

        let loggedOut  = false

        this.state = {
            loggedOut
        }

        const userAuthorizedId = localStorage.getItem('AuthUserId')
        if (userAuthorizedId != null) {
            localStorage.clear()
            loggedOut = true
        }

        this.state = {loggedOut}
    }

    render() {
        if (this.state.loggedOut)
        {
            return <Redirect to="/signIn" />
        }

        return (
            <Link to="/signIn" >Выйти</Link>
        );
    }
}
