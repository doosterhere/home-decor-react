import React, {FC} from 'react';

import {Alert, Snackbar} from "@mui/material";

import {selectMessageState} from "../../store";
import {useAppSelector} from "../../hooks";

interface IMessage {
    closeMessage: () => void
}

export const Message: FC<IMessage> =
    ({
         closeMessage
     }) => {
        const messageState = useAppSelector(selectMessageState);

        return (
            <>
                <Snackbar
                    anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                    autoHideDuration={5000}
                    open={messageState.isMessageOpen}
                    onClose={closeMessage}
                >
                    <Alert
                        severity={messageState.severity}
                        variant='filled'
                    >
                        {messageState.messageText}
                    </Alert>
                </Snackbar>
            </>
        );
    };