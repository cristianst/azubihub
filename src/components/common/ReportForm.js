import React, { Component } from 'react';
import {  Form, Radio, Input, Select } from 'semantic-ui-react';
import { DayPickerRangeController } from 'react-dates';
import { START_DATE } from 'react-dates/constants';
import * as moment from 'moment';
import classNames from 'classnames';

class ReportForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            department: props.report.department || '',
            userId: props.report.createdBy || '',
            year: props.report.year || null,
            startDate: moment(props.report.startDate, "DD-MM-YYYY") || null,
            endDate: moment(props.report.endDate, "DD-MM-YYYY") || null,
            reportType: props.report.school === "school" ? "school" : "work",
            reportContent: props.report.content || '',
            creatingReport: false,
            focusedInput: START_DATE
        };
    }

    handleChangeDepartment = (e, {value}) => {
        this.setState({
            department: value
        });
    }
    handleChangeYear = (e, {value}) => {
        this.setState({
            year: +value
        });
    }
    handleChangeTextAreaContent = (e, {value}) => {
        this.setState({
            reportContent: value
        });
    }
    handleChangeType = (e, {value}) => {
        this.setState({
            reportType : value
        });
    }
    onFocusChange = (focusedInput) => {
        this.setState({ focusedInput });
    }
    onDatesChange= ({startDate, endDate}) => {
        this.setState({ startDate, endDate });
    }
    isWeekendDay(day){
        const dayNumber = day.weekday();
        if(dayNumber === 6 || dayNumber === 0){
            return true;
        }

        return false;
    }
    render(){
        const readOnly = this.props.readOnly || false;
        const { focusedInput, startDate, endDate, year, reportType, department, reportContent } = this.state;
        const labelForWeekContent = reportType === 'work' ? 'Work done' : 'Lessons content';
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
                        {/* <Dropdown placeholder='Learning Year' onChange={this.handleChangeYear} options={yearOptions} /> */}
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
                        value={reportContent}
                        label={labelForWeekContent}
                        onChange={this.handleChangeTextAreaContent}
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