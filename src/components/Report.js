import React, { Component } from 'react';
import { Grid, Header, Icon, Button } from 'semantic-ui-react';
import Noty from 'noty';
import FirebaseApp from '../utils/Firebase';
import LoggedUserLayout from '../layouts/LoggedUserLayout';
import ReportForm from './common/ReportForm';
import generatePDF from '../utils/generatePDF';

const standardToastConfig = {
    theme: 'semanticui',
    layout: 'topRight',
    timeout: 1500,
    progressBar: false,
};

class Report extends Component {
    constructor(props){
        super(props);
        this.state = {
            report: null,
            readOnly: true,
        };
    }
    handleChangeDepartment = (department) => {
        this.setState(prevState => ({
            report: {
                ...prevState.report,
                department,
            }
        }));
    }
    handleChangeYear = (year) => {
        this.setState(prevState => ({
            report: {
                ...prevState.report,
                year,
            }
        }));
    }
    handleChangeReportContent = (content) => {
        this.setState(prevState => ({
            report: {
                ...prevState.report,
                content,
            }
        }));
    }
    handleChangeType = (type) => {
        this.setState(prevState => ({
            report: {
                ...prevState.report,
                school: type === 'school',
            }
        }));
    }
    handleChangeDates = ({ startDate, endDate}) => {
        this.setState(prevState => ({
            report: {
                ...prevState.report,
                startDate,
                endDate,
            }
        }));
    }
    toggleEditing = () => {
        this.setState({
            readOnly: !this.state.readOnly
        });
    }
    componentDidMount(){
        const { id : reportId } = this.props.match.params;
        const { history } = this.props;

        FirebaseApp.getCurrentUser()
            .then(user => {
                this.setState({
                    userName: user.displayName
                })
            });

        FirebaseApp.getReport(reportId)
            .then(report => {
                if(report){
                    this.setState({
                        reportId,
                        report,
                    });
                } else {
                    history.push({
                        pathname: `/404`,
                    });
                }
            });
    }
    generatePDF = () =>{
        const { reportId, userName } = this.state;
        FirebaseApp.getReport(reportId)
            .then(report => {
                generatePDF({userName, report});
            });
    }
    updateReport = () => {
        const { report, reportId } = this.state;
        
        FirebaseApp.updateReport({ reportId, report })
            .then(() => {
                new Noty({
                    ...standardToastConfig,
                    text: 'Report Updated',
                    type: 'success',
                }).show();
                this.setState({
                    readOnly: true
                });
            });
    }
    render(){
        const { report, readOnly } = this.state;
        const { history } = this.props;
        if(!report) return null;
        return (
            <LoggedUserLayout>
                <Grid
                    verticalAlign='middle'
                    className='userMainGrid userReportView'
                    centered={true}
                    padded
                    >
                        <Grid.Row>
                            <Header as='h3'>
                                {`Report from ${report.startDate} to ${report.endDate}`}
                            </Header>
                            <Icon name='edit' className="editButton clickable" onClick={this.toggleEditing}/>
                        </Grid.Row>
                        <Grid.Row style={{textAlign: 'left'}} >
                            <ReportForm 
                                report={report} 
                                readOnly={readOnly}
                                onChangeDepartment={this.handleChangeDepartment}
                                onChangeYear={this.handleChangeYear}
                                onChangeReportContent={this.handleChangeReportContent}
                                onChangeType={this.handleChangeType}
                                onChangeDates={this.handleChangeDates}
                            />
                        </Grid.Row>
                        <Grid.Row>
                            <div className="actionButtons">
                                { !readOnly ?
                                    <Button color='teal' onClick={() => {this.updateReport()}}>UPDATE</Button>
                                :
                                    <Button color='teal' onClick={() => { this.generatePDF()}}>GENERATE PDF</Button>
                                }

                                <Button 
                                    color='grey' 
                                    onClick={() => history.push({pathname: `${process.env.PUBLIC_URL}/`})} 
                                    animated
                                >
                                    <Button.Content visible>BACK TO HOME</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='left arrow' />
                                    </Button.Content>
                                </Button>
                            </div>
                        </Grid.Row>    
                    </Grid>
            </LoggedUserLayout>

        );
    }
}

export default Report;