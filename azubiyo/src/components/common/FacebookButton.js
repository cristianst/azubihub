import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const FacebookButton = ({ onClick }) => (
    <div className="facebookButton">
        <Button icon labelPosition='right' color='facebook' onClick={onClick}>
          Login with Facebook
          <Icon name='facebook f' />
        </Button>
    </div>
);

export default FacebookButton;