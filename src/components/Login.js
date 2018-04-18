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
                <Header as="h2">azubiYO!</Header>
                <FacebookButton onClick={loginAction}/>
            </Grid.Column>
        </Grid>
    </div>

);

export default Login;