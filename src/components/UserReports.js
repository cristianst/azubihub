import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { List } from 'semantic-ui-react';

class UserReports extends Component {
    navigateToReport = (reportId) => {
        const { history } = this.props;
        // fix this shit making a root url global
        history.push({
            pathname: `/reports/${reportId}`
        });
    }
    render(){
        const { reports } = this.props;
        return(
            <List selection verticalAlign='middle'>
                { reports.map((report, index) => (
                    <List.Item className="userReportItem" key={index} onClick={() => this.navigateToReport(report._id)}>
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