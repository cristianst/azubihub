import React, { Component } from 'react';
import { Grid, Header, Icon, Button } from 'semantic-ui-react';
import FirebaseApp from '../utils/Firebase';
import LoggedUserLayout from './LoggedUserLayout';
import ReportForm from './common/ReportForm';
import generatePDF from '../utils/generatePDF';

class Report extends Component {
    constructor(props){
        super(props);
        this.state = {
            report: null,
            readOnly: true
        };
    }
    toggleEditing = () => {
        this.setState({
            readOnly: !this.state.readOnly
        });
    }
    componentDidMount(){
        const { id : reportId } = this.props.match.params;
        FirebaseApp.getReport(reportId)
            .then(report => {
                this.setState({
                    report
                });
            })
            .catch(e => {
                console.log(e);
            });
    }
    generatePDF = (userName) =>{
        const { report } = this.state;
        generatePDF({userName, report});
    }
    render(){
        const { report, readOnly } = this.state;
        const { history } = this.props;
        return (
            <LoggedUserLayout>
                {
                    ({userName}) => {
                        if(report){
                            return (
                                <Grid
                                verticalAlign='middle'
                                className='userMainGrid'
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
                                        <ReportForm report={report} readOnly={readOnly}>
                                            { !readOnly ?
                                                <Button color='teal' onClick={this.generateReport}>UPDATE</Button>
                                            :
                                                <Button color='teal' onClick={() => { this.generatePDF(userName)}}>GENERATE PDF</Button>
                                            }

                                            <Button color='grey' onClick={() => history.push({pathname: `${process.env.PUBLIC_URL}/`})} animated>
                                                <Button.Content visible>BACK TO HOME</Button.Content>
                                                <Button.Content hidden>
                                                    <Icon name='left arrow' />
                                                </Button.Content>
                                            </Button>
                                        </ReportForm>
                                    </Grid.Row>
                                </Grid>
                            )
                        }

                        return null;
                    }    
                }
            </LoggedUserLayout>

        );
    }
}

export default Report;