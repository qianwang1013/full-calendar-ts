import { Dialog, Classes } from "@blueprintjs/core";
import * as React from 'react';
import Event from '../model/Event';

const  IDialogExampleState =  {
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    isOpen: false,
    usePortal: true,
}

interface EventModalProps {
    event: Event;
    modalCtrl: typeof IDialogExampleState,
    _handleClose: any,
}

export default function EventModal( props : EventModalProps ){
    const {event, modalCtrl, _handleClose} = props;
    console.log(event);
    return(
        <Dialog
            icon="info-sign"
            onClose={_handleClose}
            title={event.title}
            {...modalCtrl}
        >
            <div className={Classes.DIALOG_BODY}>
                <p>
                    {event.title}
                </p>
            </div>
            
        </Dialog>
    )
}
