import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import './styles/404.css';

const Page404 = ({history}) => (
    <div className="404 wrapper">
        <div>
            <div className="displayText">
                <div className="errorCode">
                    <img alt="PAGE NOT FOUND" src="https://media.giphy.com/media/BEYRc8P1IaiaY/source.gif" />
                </div>
                <div className="errorMessage">Oups! Sorry, page not found.</div>
                <Button color='grey' onClick={() => history.push({pathname: `${process.env.PUBLIC_URL}/`})} animated>
                    <Button.Content visible>BACK TO HOME</Button.Content>
                    <Button.Content hidden>
                        <Icon name='left arrow' />
                    </Button.Content>
                </Button>
            </div>

        </div>
    </div>
);

export default Page404;
