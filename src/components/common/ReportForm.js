import React, { Component } from 'react';
import {  Form, Radio, Input, Select } from 'semantic-ui-react';
import { DayPickerRangeController } from 'react-dates';
import { START_DATE } from 'react-dates/constants';
import * as moment from 'moment';
import classNames from 'classnames';

const getMomentDate = (date) => moment(date, "DD-MM-YYYY");

class ReportForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            focusedInput: START_DATE
        }
    }
    handleChangeDepartment = (e, {value}) => {
        this.props.onChangeDepartment(value)
    }
    handleChangeYear = (e, {value}) => {
        this.props.onChangeYear(+value);
    }
    handleChangeReportContent = (e, {value}) => {
        this.props.onChangeReportContent(value);
    }
    handleChangeType = (e, {value}) => {
        this.props.onChangeType(value);
    }
    handleChangeDates= ({startDate, endDate}) => {
        this.props.onChangeDates({ 
            startDate: startDate.format('DD-MM-YYYY'), 
            endDate: endDate.format('DD-MM-YYYY')
        });
        
    }
    onFocusChange = (focusedInput) => {
        this.setState({ focusedInput });
    }
    isWeekendDay(day){
        const dayNumber = day.weekday();
        if(dayNumber === 6 || dayNumber === 0){
            return true;
        }

        return false;
    }
    render(){
        const { readOnly = false } = this.props;
        const { 
            department = null, 
            year = null, 
            startDate = null, 
            endDate = null, 
            school = true,
            content: reportContent = null,
        } =  this.props.report;

        const { focusedInput } = this.state;

        const labelForWeekContent = school ? 'Lessons content' : 'Work done' ;
        const yearOptions = [
            { key: '1', text: '1', value: 1 },
            { key: '2', text: '2', value: 2 },
            { key: '3', text: '3', value: 3 }
        ];

        const reportClasses = classNames('reportForm', {
            'readOnly': readOnly
        });

        return(
            <div className={reportClasses}>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Field 
                            control={Input} 
                            label='Current Department' 
                            value={department} 
                            placeholder='Company Department' 
                            onChange={this.handleChangeDepartment} 
                        />
                        <Form.Field 
                            control={Select}
                            value={year} 
                            label='Learning Year' 
                            options={yearOptions} 
                            placeholder='Year' 
                            onChange={this.handleChangeYear}
                        />
                    </Form.Group>
                    <div className="field">
                        <label>Report Week</label>
                        <div style={{ marginTop : 15, marginBottom: 15}} className="textCentered">
                            <div style={{ display: 'inline-block' }} >
                                <DayPickerRangeController
                                    startDate={getMomentDate(startDate)}
                                    endDate={getMomentDate(endDate)}
                                    numberOfMonths={1}
                                    hideKeyboardShortcutsPanel={true}
                                    minimumNights={4}
                                    enableOutsideDays={true}
                                    endDateOffset={day => day.weekday() === 1 ? day.add(4, 'days') : day.add(6,'days')}
                                    isDayBlocked={day => this.isWeekendDay(day) }
                                    onDatesChange={this.handleChangeDates}
                                    focusedInput={focusedInput}
                                    onFocusChange={this.onFocusChange}
                                />
                            </div>
                        </div>
                    </div>
                    <Form.Group inline>
                        <label>Type</label>
                        <Form.Field control={Radio} label='Work' value='work' checked={!school} onChange={this.handleChangeType} />
                        <Form.Field control={Radio} label='School' value='school' checked={school} onChange={this.handleChangeType} />
                    </Form.Group>
                    <Form.TextArea
                        value={reportContent}
                        label={labelForWeekContent}
                        onChange={this.handleChangeReportContent}
                        placeholder='Stuff you had in the week.'
                        autoHeight
                    />
                </Form>
                { this.props.children ?
                    <div className="formActions textCentered">
                        {this.props.children}
                    </div>
                :
                    null
                }
            </div>
        );
    }
}

export default ReportForm;