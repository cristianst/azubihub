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
            pathname: `/new`,
            state: {
                user
            }
        });
    }
    componentWillMount(){
        const currentUserId = this.props.user._id;
        const reportCollection = firebase.firestore().collection('/reports')
            .where('createdBy', '==', currentUserId);

        // Retrieve Reports Snapshot
        var observer = reportCollection.onSnapshot(snapshot => {

            const reports = snapshot.docs.map(doc => ({
                _id: doc.id,
                ...doc.data(),
            }));

            this.setState({
                reports,
                reportsLoaded: true
            });
 
        }, err => {
            console.log(observer);
        }); 
    }
    renderReports = () => {
        const { reportsLoaded } = this.state;
        if(reportsLoaded){
            return this.renderLoadedReports()
        }

        return <div>Loading reports...</div>
    }
    renderLoadedReports(){
        const { reports } = this.state;
        if(reports.length > 0 ){
            console.log(reports);
            return <UserReports reports={reports} />
        }
        
        return <div>No reports found</div>;
    }
    render(){
        //const { reports, reportsLoaded } = this.state;
        const { displayName } = this.props.user;

        return(
            <div className="userMainPage">
                <Grid
                  verticalAlign='middle'
                  centered={true}
                  className='userMainGrid'
                  padded
                >
                    <Grid.Row>
                        <Header as="h2">
                            Welcome {displayName}
                        </Header>
                    </Grid.Row>
                    <Grid.Row>
                            {this.renderReports()}
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