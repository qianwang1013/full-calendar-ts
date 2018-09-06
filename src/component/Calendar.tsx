import * as React from 'react';
import * as $ from 'jquery';
import  'fullcalendar';
import '../css/react-big-calendar.css';
import { observer, inject } from 'mobx-react';
import { autorun } from 'mobx';
import EventModal from './EventModal';
import Event from '../model/Event';
import * as moment from 'moment';

const MyCalendarInitalState = { 
    currentMonth: '',
    modalCtrl : {
        autoFocus: true,
        canEscapeKeyClose: true,
        canOutsideClickClose: true,
        enforceFocus: true,
        isOpen: false,
        usePortal: true,
    },
    selectedEvent:  {
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
}

type State = Readonly <typeof MyCalendarInitalState> 

@inject('EventStore')
@observer
export default class MyCalendar extends React.Component<any, State> {
    readonly state : State = MyCalendarInitalState;

    componentDidMount() {
        
        $('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            events: [],
            eventClick: ( e : any ) => {
                console.log(e);
                this.openEventModal(e);
            },
            editable: true,
            droppable: true,
            drop: function() {
                // is the "remove after drop" checkbox checked?
                if ($('#drop-remove').is(':checked')) {
                    // if so, remove the element from the "Draggable Events" list
                    $(this).remove();
                }
            }
        });

        this._renderEvent();
        // this._renderEventModal();
    }

    openEventModal = ( newEvent : Event ) => {
        const selectedEvent  = {
            _id : newEvent._id,
            title: newEvent.title, 
            allDay: newEvent.allDay,
            start: newEvent.start,
            end: newEvent.end,
            url: newEvent.url,
            editable: newEvent.editable,
            startEditable: newEvent.startEditable,
            durationEditable: newEvent.durationEditable,
            resourceEditable: newEvent.resourceEditable,
            color: newEvent.color,
            backgroundColor: newEvent.backgroundColor,
            borderColor: newEvent.borderColor,
            textColor: newEvent.textColor
        }

        this.setState((prevState) => {
            let openModalCtrl = prevState.modalCtrl;
            openModalCtrl.isOpen = true;
            
            return {
                ...prevState,
                modalCtrl: openModalCtrl,
                selectedEvent
            }
        })
    }

    closeEventModal = () => {
        this.setState((prevState) => {
            let openModalCtrl = prevState.modalCtrl;
            openModalCtrl.isOpen = false;
            return {
                ...prevState,
                modalCtrl: openModalCtrl
            }
        })
    }

    _renderEvent = () => {
        autorun(() => {
            if( this.props.EventStore.getPendingEventArray.length > 0 ){
                $('#calendar').fullCalendar( 'addEventSource' , this.props.EventStore.getPendingEventArray);
                this.props.EventStore.onCompletedPendingEvents();
            }
        });
    };


    render() {
        return (
            <div>
                <div id="calendar" /> 
                <EventModal
                    event = {this.state.selectedEvent}
                    modalCtrl = {this.state.modalCtrl}
                    _handleClose = {this.closeEventModal}
                />
            </div>
        );
    }
}
