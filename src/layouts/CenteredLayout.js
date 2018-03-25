import React from 'react';
import { Grid } from 'semantic-ui-react';

const CenteredLayout = ({ children }) => (
    <div className="mainLayout">
        <Grid
          verticalAlign='middle'
          centered={true}
          className='userMainGrid'
        >
            {{ children }}
        </Grid>
    </div>
);

export default CenteredLayout;