import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { List } from 'semantic-ui-react';
import _  from 'lodash';
import FirebaseApp from '../utils/Firebase';

class UserReports extends Component {
    navigateToReport = (reportId) => {
        const { history } = this.props;
        // fix this shit making a root url global
        history.push({
            pathname: `/reports/${reportId}`
        });
    }
    deleteReport = (e, reportId) => {
        e.stopPropagation();
        FirebaseApp.deleteReport(reportId)
            .then((r) => console.log(r))
            .catch(e => console.log(e));
    }
    render(){
        const { reports } = this.props;
        const sortedReports = _.orderBy(reports, 'startDate').reverse();

        return(
            <List selection verticalAlign='middle'>
                { sortedReports.map((report, index) => (
                    <List.Item className="userReportItem" key={index} onClick={() => this.navigateToReport(report._id)}>
                        <List.Content floated='right' verticalAlign='middle' >
                            <List.Icon className='deleteReport' color='red' name='trash' onClick={(e) => this.deleteReport(e, report._id)}/>
                        </List.Content> 
                        
                        <List.Content>
                            <List.Header as='h4'>Report {index + 1} - {report.school ? 'School' : 'Company'} </List.Header>
                            <List.Description>Week from
                                <a><b> {report.startDate}</b></a> to
                                <a><b> {report.endDate}</b></a>
                            </List.Description>
                        </List.Content>
                        
                    </List.Item>
                )) }
            </List>
        );
    }
}

export default withRouter(UserReports);