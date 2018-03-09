import React from 'react';
import { List } from 'semantic-ui-react'

const UserReports = ({reports}) => (
    <List selection verticalAlign='middle'>
        { reports.map((report, index) => (
            <List.Item className="userReportItem" key={index}>
                <List.Content>
                    <List.Header as='h4'>Report {index + 1} - {report.school ? 'School' : 'Company'} </List.Header>
                    <List.Description>Week from
                        <a><b> {report.start}</b></a> to
                        <a><b> {report.end}</b></a>
                    </List.Description>
                </List.Content>
            </List.Item>
            /*<div key={index}>
                <span>{report.department}</span>
            </div>*/
        )) }
    </List>
);

export default UserReports;