import {  action, computed, observable, toJS } from 'mobx';
import Event from '../model/Event';

class EventStore{
    @observable allEventArray : Event[] = [];
    @observable pendingEventArray: Event[] = [];
    
    @observable currentMonth: String; 

    @action addEvent( event : Event ){
        this.pendingEventArray.push( event );
    }

    @action onCompletedPendingEvents(){
        this.allEventArray = this.allEventArray.concat( this.pendingEventArray);
        this.pendingEventArray = [];
    }

    @computed get getPendingEventArray(){
        return toJS(this.pendingEventArray);
    }

}


export default new EventStore(); 