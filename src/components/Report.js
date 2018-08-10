import React, { Component } from 'react';
import { Grid, Header, Icon, Button } from 'semantic-ui-react';
import FirebaseApp from '../utils/Firebase';
import LoggedUserLayout from '../layouts/LoggedUserLayout';
import ReportForm from './common/ReportForm';
import generatePDF from '../utils/generatePDF';

class Report extends Component {
    constructor(props){
        super(props);
        this.state = {
            report: null,
            readOnly: true,
        };
    }
    toggleEditing = () => {
        this.setState({
            readOnly: !this.state.readOnly
        });
    }
    componentDidMount(){
        const { id : reportId } = this.props.match.params;
        const { history } = this.props;
        FirebaseApp.getReport(reportId)
            .then(report => {
                if(report){
                    this.setState({
                        report,
                    });
                } else {
                    history.push({
                        pathname: `/404`,
                    });
                }
            });
    }
    generatePDF = (userName) =>{
        const { report } = this.state;
        FirebaseApp.getCurrentUser().then((result) => {
            generatePDF({userName : result.displayName , report});
        }).catch((e) => {
            throw Error ('User cant be recognized');
        });
        
    }
    updateReport = () => {
        console.log(this.state.report);
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
                                />
                        </Grid.Row>
                        <Grid.Row>
                            <div className="actionButtons">
                                { !readOnly ?
                                    <Button color='teal' onClick={() => {this.updateReport()}}>UPDATE</Button>
                                :
                                    /* <Button 
                                        color='teal' 
                                        onClick={() => { this.generatePDF('maboy')}}
                                        animated
                                    >
                                        <Button.Content visible>GENERATE PDF</Button.Content>
                                        <Button.Content hidden>
                                            <Icon name='file pdf outline' />
                                        </Button.Content>
                                    </Button> */
                                    <Button color='teal' onClick={() => { this.generatePDF('maboy')}}>GENERATE PDF</Button>
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