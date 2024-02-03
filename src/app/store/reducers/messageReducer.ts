import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface ISingleMessage {
    text: string;
    severity: 'success' | 'error';
    key: number;
}

interface IMessageState {
    isMessageOpen: boolean;
    messages: ISingleMessage[];
}

const initialState: IMessageState = {
    isMessageOpen: false,
    messages: []
}

export const messageReducer = createSlice({
    name: 'message',
    initialState,
    reducers: (create) => ({
        enqueueSuccessMessage: create.reducer((state, action: PayloadAction<string>) => {
            state.messages.push({text: action.payload, severity: 'success', key: Date.now()});
        }),
        enqueueErrorMessage: create.reducer((state, action: PayloadAction<string>) => {
            state.messages.push({text: action.payload, severity: 'error', key: Date.now()});
        }),
        removeFirstMessage: create.reducer((state) => {
            state.messages.shift();
        }),
        showMessage: create.reducer((state) => {
            state.isMessageOpen = true;
        }),
        hideMessage: create.reducer((state) => {
            state.isMessageOpen = false;
        })
    }),
    selectors: {
        selectMessageVisibility: (state) => state.isMessageOpen,
        selectMessages: (state) => state.messages,
        selectFirstMessage: (state) => state.messages[0]
    }
});

export const {
    enqueueSuccessMessage,
    enqueueErrorMessage,
    removeFirstMessage,
    showMessage,
    hideMessage
} = messageReducer.actions;
export const {selectMessageVisibility, selectMessages, selectFirstMessage} = messageReducer.selectors;