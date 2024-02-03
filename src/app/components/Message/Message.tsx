import React, {FC, useEffect, useState} from 'react';

import {Alert, Snackbar} from "@mui/material";

import {
    ISingleMessage,
    selectMessageVisibility,
    selectMessages,
    selectFirstMessage,
    removeFirstMessage,
    showMessage,
    hideMessage
} from "../../store";
import {useAppSelector, useAppDispatch} from "../../hooks";

interface IMessage {
    closeMessage: () => void
}

export const Message: FC<IMessage> =
    ({
         closeMessage
     }) => {
        const isMessageVisible = useAppSelector(selectMessageVisibility);
        const messages = useAppSelector(selectMessages);
        const firstMessage = useAppSelector(selectFirstMessage);
        const [message, setMessage] = useState<ISingleMessage | undefined>(undefined);
        const dispatcher = useAppDispatch();

        useEffect(() => {
            if (messages.length && !message) {
                setMessage(firstMessage);
                dispatcher(removeFirstMessage());
                dispatcher(showMessage());
            } else if (messages.length && message && isMessageVisible) {
                dispatcher(hideMessage());
            }
        }, [messages, message, isMessageVisible]);

        const handleExited = () => {
            setMessage(undefined);
        };

        return (
            <>
                <Snackbar
                    anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                    autoHideDuration={5000}
                    open={isMessageVisible}
                    onClose={closeMessage}
                    key={message ? message.key : undefined}
                    TransitionProps={{onExited: handleExited}}
                >
                    <Alert
                        severity={message ? message.severity : 'info'}
                        variant='filled'
                    >
                        {message ? message.text : undefined}
                    </Alert>
                </Snackbar>
            </>
        );
    };