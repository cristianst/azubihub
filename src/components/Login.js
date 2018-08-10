import React from 'react';
import { Header, Grid } from 'semantic-ui-react'

import FacebookButton from './common/FacebookButton.js';

const Login = ({loginAction}) => (
    <div className="mainLogin">
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
          padded
        >  
            <Grid.Column style={{ maxWidth: 450 }}>
                <div class="logoContainer">
                    <img alt="azubiHUB" src="/blobby-logo.svg" />
                </div>
                <Header as="h2">azubiHUB!</Header>
                <FacebookButton onClick={loginAction}/>
            </Grid.Column>
        </Grid>
    </div>

);

export default Login;