import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { List } from 'semantic-ui-react';
import _  from 'lodash';
import FirebaseApp from '../utils/Firebase';
import ConfirmationModal from './common/ConfirmationModal';

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
        FirebaseApp.deleteReport('foo')
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
        console.log("render reports");
        const { reports } = this.props;
        console.log(reports);
        const sortedReports = _.orderBy(reports, 'startDate').reverse();

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