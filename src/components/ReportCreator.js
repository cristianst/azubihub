import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import React, { Component } from 'react';
import { Grid, Header, Form, Radio, Input, Select } from 'semantic-ui-react';
import { START_DATE } from 'react-dates/constants';
import { DayPickerRangeController } from 'react-dates';

import FirebaseApp from '../utils/Firebase';

class ReportCreator extends Component {
    constructor(props){
        super(props);
        this.state = {
            reportType: "work",
            startDate: null,
            endDate: null,
            focusedInput: START_DATE
        };

        this.onDatesChange = this.onDatesChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
    }
    handleChangeTextAreaContent(event, data){
        console.log(data.value.replace(/(?:\r\n|\r|\n)/g, '<br/>'));
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
        //console.log(startDate);
        this.setState({ startDate, endDate });
    }
    componentDidMount(){
        FirebaseApp.getCurrentUser().then((result) => {
            //console.log(result);
        }).catch((e) => {
            const { history } = this.props;
            history.push({
                pathname: '/404'
            });
        });
    }
    isWeekendDay(day){
        const dayNumber = day.weekday();
        if(dayNumber === 6 || dayNumber === 0){
            return true;
        }

        return false;
    }
    render(){
        const { focusedInput, startDate, endDate, reportType } = this.state;
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

                    <Grid.Row style={{textAlign: 'left'}}>
                        <Form>
                        <Form.Group widths='equal'>
                            <Form.Field control={Input} label='Department' placeholder='Company Department' />
                            <Form.Field control={Select} label='Learning Year' options={yearOptions} placeholder='Year' />
                        </Form.Group>
                            <div className="field">
                                <label>Select week</label>
                                <div style={{ marginTop : 15, marginBottom: 15}}>
                                    <DayPickerRangeController
                                        startDate={startDate}
                                        endDate={endDate}
                                        numberOfMonths={1}
                                        hideKeyboardShortcutsPanel={true}
                                        minimumNights={4}
                                        enableOutsideDays={true}
                                        endDateOffset={day => day.weekday() === 1 ? day.add(4, 'days') : day.add(7,'days')}
                                        isDayBlocked={day => this.isWeekendDay(day) }
                                        onDatesChange={this.onDatesChange} // PropTypes.func.isRequired,
                                        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                        onFocusChange={this.onFocusChange}// PropTypes.func.isRequired,
                                    />
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
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default ReportCreator;