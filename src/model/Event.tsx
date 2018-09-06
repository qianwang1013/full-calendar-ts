import * as moment from 'moment';

export default interface Event {
    _id: string, 
    title: string, 
    allDay: boolean,
    start: moment.Moment,
    end: moment.Moment,
    url: string,
    editable: boolean,
    startEditable: boolean,
    durationEditable: boolean,
    resourceEditable: boolean,
    color: string,
    backgroundColor: string,
    borderColor: string,
    textColor: string
}