import { FormGroup, InputGroup, AnchorButton } from "@blueprintjs/core";
import { DateRangeInput } from "@blueprintjs/datetime";
import * as React from 'react';
import * as moment from 'moment';
import '../css/react-big-calendar.css';
import { observer, inject } from 'mobx-react';
import Event from '../model/Event';

interface EventFormProps {
    event: Event;
}

const eventFormIntialState : Event = {
    _id: '', 
    title: '', 
    allDay: true,
    start: moment(),
    end: moment().add(1, 'd'),
    url: '',
    editable: true,
    startEditable: true,
    durationEditable: true,
    resourceEditable: true,
    color: '',
    backgroundColor: '',
    borderColor: '',
    textColor: ''
}

@inject('EventStore')
@observer
export default class EventForm extends React.Component<any, Event> {

    constructor(props : EventFormProps){
        super(props)
        this.state = eventFormIntialState;
    }

    componentDidMount() {
        console.log(this.props);
    }

    _onChangeTitle = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        const newValue = e.currentTarget.value;
        this.setState( (prevState) => {
            return {
                ...prevState,
                title: newValue,
            }
        })
    }

    _onChange(values : any) {
        this.setState( (prevState) => {
            return {
                ...prevState,
                start: moment(values[0]),
                end: moment(values[1]),
            }
        })
    }

    _onSubmit(){
        this.props.EventStore.addEvent(this.state);
    }
    
    
    render() {
        return (
            <div>
                <FormGroup 
                    label="Create new event"
                    labelFor="text-input"
                    labelInfo="(required)"
                >
                    <InputGroup 
                        id="text-input" 
                        placeholder="Title" 
                        onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => {
                            this._onChangeTitle(e);
                        } }
                        value={this.state.title}
                    />
                    <DateRangeInput
                        onChange={this._onChange.bind(this)}
                        formatDate={date => date.toLocaleString()}
                        parseDate={str => new Date(str)}
                        value={[this.state.start.toDate(), this.state.end.toDate()]}
                    />
                    
                </FormGroup>

                <AnchorButton 
                    text='Submit'
                    onClick={this._onSubmit.bind(this)}
                />

            </div>
            
        );
    }
}
