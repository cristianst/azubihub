import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { List } from 'semantic-ui-react';
import _  from 'lodash';
import FirebaseApp from '../utils/Firebase';
import ConfirmationModal from './common/ConfirmationModal';
import * as moment from 'moment';

class UserReports extends Component {
    constructor(props){
        super(props);
        this.state = {
            deleteModalOpen: false
        }
    }
    navigateToReport = (reportId) => {
        const { history } = this.props;
        // fix this shit making a root url global
        history.push({
            pathname: `/reports/${reportId}`
        });
    }
    handleCancelDelete = () => {
        this.setState({
            deleteModalOpen: false
        });
    }
    handleConfirmDelete = (e, d) => {
        FirebaseApp.deleteReport(this.reportId)
            .then((r) => console.log(r))
            .catch(e => console.log(e));
        this.setState({
            deleteModalOpen: false
        });
    }
    deleteReport = (e, reportId) => {
        e.stopPropagation();
        this.reportId = reportId;
        this.setState({
            deleteModalOpen: true
        });
    }
    render(){
        const { reports } = this.props;
        const sortedReports = reports.sort((a, b) => {
            return moment(a.startDate, 'DD-MM-YYYY') - moment(b.startDate, 'DD-MM-YYYY')
        }).reverse();

        return(
            <div>
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
                <ConfirmationModal 
                    content='This action can not be undone. Are you sure?'
                    open={this.state.deleteModalOpen}
                    handleCancel={this.handleCancelDelete}
                    handleConfirm={this.handleConfirmDelete}
                />
            </div> 
        );
    }
}

export default withRouter(UserReports);