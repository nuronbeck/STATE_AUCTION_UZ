import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { LayoutAuthorized } from './components/LayoutAuthorized';
import { Home } from './components/Home';
import { lotList } from './components/lotList';
import { lotDetails } from './components/lotDetails';
import { documentation } from './components/documentation';
import { signIn } from './components/signIn';
import { signUp } from './components/signUp';
import { userCabinet } from './components/userCabinet';
import { userCabinetAddLot } from './components/userCabinetAddLot';
import { userSettings } from './components/userSettings';
import { logoutCabinet } from './components/logoutCabinet';

export default class App extends Component {
    displayName = App.name

    render()
    {
        if (localStorage.getItem('AuthUserId') != null)
        {
            return (
                <LayoutAuthorized>
                    <Route exact path='/' component={Home} />
                    <Route path='/lotslist' component={lotList} />
                    <Route path='/documentation' component={documentation} />
                    <Route path='/signIn' component={signIn} />
                    <Route path='/signUp' component={signUp} />
                    <Route path='/lotDetails/:lotId' component={lotDetails} />
                    <Route path='/userCabinet' component={userCabinet} />
                    <Route path='/cabinet/settings' component={userSettings} />
                    <Route path='/lot/add' component={userCabinetAddLot} />
                    <Route path='/logout' component={logoutCabinet} />
                </LayoutAuthorized>
            )
        }

        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/lotslist' component={lotList} />
                <Route path='/documentation' component={documentation} />
                <Route path='/signIn' component={signIn} />
                <Route path='/signUp' component={signUp} />
                <Route path='/lotDetails/:lotId' component={lotDetails} />
                <Route path='/userCabinet' component={userCabinet} />
                <Route path='/logout' component={logoutCabinet} />
            </Layout>
        );
    }
}
