import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Button, Header, Grid } from 'semantic-ui-react';

import firebaseApp from '../firebase.js';
import UserReports from './UserReports.js';

class UserMain extends Component {
    constructor(props){
        super(props);
        this.state = {
            reports: [],
            reportsLoaded: false,
        };

    }
    componentWillMount(){
        let reports = [];
        // Reference to Report Collection from User
        const reportCollection = firebase.firestore().collection('/users')
            .doc(this.props.user._id)
            .collection('reports');

        // Retrieve Reports Snapshot
        const getReportsSnapshot = reportCollection.get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    reports.push(doc.data());
                });

                this.setState({
                    reportsLoaded: true
                });

                if(reports.length > 0){
                    this.setState({
                        reports
                    });
                }
            });
    }
    render(){
        const { reports, reportsLoaded } = this.state;
        const { displayName, email, photoURL } = this.props.user;
        console.log(reports);
        return(
            <div className="userMainPage">
                <Grid
                  verticalAlign='middle'
                  centered={true}
                  className='userMainGrid'
                >
                    <Grid.Row>
                        <Header as="h2">
                            Welcome {displayName}
                        </Header>
                    </Grid.Row>
                    <Grid.Row>

                            { reportsLoaded ?
                                <UserReports reports={reports} />
                            :
                                <div>Reports are loading...</div>
                            }

                    </Grid.Row>
                    <Grid.Row>
                        <Button content='Create Report' primary />
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default UserMain;