import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Button, Header, Grid } from 'semantic-ui-react';
import UserReports from './UserReports.js';
import { withRouter } from 'react-router';

class UserMain extends Component {
    constructor(props){
        super(props);
        this.state = {
            reports: [],
            reportsLoaded: false,
        };

        this.createReport = this.createReport.bind(this);

    }
    createReport(){
        const { history, user } = this.props;
        history.push({
            pathname: '/new',
            state: {
                user
            }
        });
    }
    componentWillMount(){
        let reports = [];
        const currentUserId = this.props.user._id;
        const reportCollection = firebase.firestore().collection('/reports')
            .where('createdBy', '==', currentUserId);

        // Retrieve Reports Snapshot
        reportCollection.get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    let report = {};
                    const reportId = doc.id;
                    report = {
                        _id: reportId,
                        ...doc.data()
                    };
                    reports.push(report);
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
        const { displayName } = this.props.user;

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
                        <Button onClick={this.createReport} content='NEW REPORT' color='teal' />
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

const userMainWithRouter = withRouter(UserMain);

export default userMainWithRouter;