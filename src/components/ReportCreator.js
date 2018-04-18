import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import React, { Component } from 'react';
import { Grid, Header, Form, Radio, Input, Select, Button, Icon } from 'semantic-ui-react';
import { START_DATE } from 'react-dates/constants';
import { DayPickerRangeController } from 'react-dates';

import FirebaseApp from '../utils/Firebase';

class ReportCreator extends Component {
    constructor(props){
        super(props);
        this.state = {
            department: '',
            userId: '',
            year: null,
            startDate: null,
            endDate: null,
            reportType: "work",
            reportContent: '',
            creatingReport: false,
            focusedInput: START_DATE
        };

        this.handleChangeDepartment = this.handleChangeDepartment.bind(this);
        this.handleChangeYear = this.handleChangeYear.bind(this);
        this.onDatesChange = this.onDatesChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
        this.handleChangeTextAreaContent = this.handleChangeTextAreaContent.bind(this);
        this.generateReport = this.generateReport.bind(this);
    }

    componentDidMount(){
        FirebaseApp.getCurrentUser().then((result) => {
            this.setState({
                userId: result.uid
            });
        }).catch((e) => {
            const { history } = this.props;
            history.push({
                pathname: '/404'
            });
        });
    }
    handleChangeDepartment(e, {value}){
        this.setState({
            department: value
        });
    }
    handleChangeYear(e, {value}){
        this.setState({
            year: +value
        });
    }
    handleChangeTextAreaContent(e, {value}){
        this.setState({
            reportContent: value
            //reportContent: value.replace(/(?:\r\n|\r|\n)/g, '<br/>')
        });
    }
    handleChangeType(e, {value}){
        this.setState({
            reportType : value
        });
    }
    onFocusChange(focusedInput){
        this.setState({ focusedInput });
    }
    onDatesChange({startDate, endDate}){
        this.setState({ startDate, endDate });
    }
    generateReport(){
        this.setState({
            creatingReport: true,
        });

        const {
            endDate,
            startDate,
            reportContent,
            reportType,
            year,
            department,
            userId,
        } = this.state;

        // Prepare Report Object
        const report = {
            startDate: startDate.format("DD-MM-YYYY"),
            endDate: endDate.format("DD-MM-YYYY"),
            createdBy: userId,
            school: reportType === "school" ? true : false,
            content: reportContent,
            year,
            department
        };

        console.log(report);
        FirebaseApp.createReport(report)
        .then(result => {
            console.log(result)
        })
        .catch(e => console.log(e));
    }

    isWeekendDay(day){
        const dayNumber = day.weekday();
        if(dayNumber === 6 || dayNumber === 0){
            return true;
        }

        return false;
    }
    render(){
        const { focusedInput, startDate, endDate, reportType, creatingReport } = this.state;
        const { history } = this.props;
        const labelForWeekContent = reportType === 'work' ? 'Work done' : 'Lessons content';
        const yearOptions = [
            { key: '1', text: '1', value: '1' },
            { key: '2', text: '2', value: '2' },
            { key: '3', text: '3', value: '3' }
        ];
        return (
            <div className="">
                <Grid
                  verticalAlign='middle'
                  centered={true}
                  className='userMainGrid'
                >
                    <Grid.Row>
                        <Header as="h2">
                            New Report
                        </Header>
                    </Grid.Row>

                    <Grid.Row style={{textAlign: 'left'}} className="columnGrid">
                        <div>
                            <Form>
                                <Form.Group widths='equal'>
                                    <Form.Field control={Input} label='Current Department' placeholder='Company Department' onChange={this.handleChangeDepartment} />
                                    <Form.Field control={Select} label='Learning Year' options={yearOptions} placeholder='Year' onChange={this.handleChangeYear}/>
                                </Form.Group>
                                <div className="field">
                                    <label>Select week</label>
                                    <div style={{ marginTop : 15, marginBottom: 15}} className="textCentered">
                                        <div style={{ display: 'inline-block' }} >
                                            <DayPickerRangeController
                                                startDate={startDate}
                                                endDate={endDate}
                                                numberOfMonths={1}
                                                hideKeyboardShortcutsPanel={true}
                                                minimumNights={4}
                                                enableOutsideDays={true}
                                                endDateOffset={day => day.weekday() === 1 ? day.add(4, 'days') : day.add(6,'days')}
                                                isDayBlocked={day => this.isWeekendDay(day) }
                                                onDatesChange={this.onDatesChange}
                                                focusedInput={focusedInput}
                                                onFocusChange={this.onFocusChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <Form.Group inline>
                                    <label>Type</label>
                                    <Form.Field control={Radio} label='Work' value='work' checked={reportType === 'work'} onChange={this.handleChangeType} />
                                    <Form.Field control={Radio} label='School' value='school' checked={reportType === 'school'} onChange={this.handleChangeType} />
                                </Form.Group>
                                <Form.TextArea
                                    label={labelForWeekContent}
                                    onChange={this.handleChangeTextAreaContent}
                                    placeholder='Stuff you had in the week.'
                                    autoHeight
                                />
                            </Form>
                            <div className="formActions textCentered">
                                <Button loading={creatingReport} color='teal' onClick={this.generateReport}>CREATE</Button>
                                <Button color='grey' onClick={() => history.push({pathname: `${process.env.PUBLIC_URL}/`})} animated>
                                    <Button.Content visible>BACK TO HOME</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='left arrow' />
                                    </Button.Content>
                                </Button>
                            </div>
                        </div>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default ReportCreator;