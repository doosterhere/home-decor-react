import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IMessageState {
    isMessageOpen: boolean;
    messageText: string;
    severity: 'success' | 'error';
}

const initialState: IMessageState = {
    isMessageOpen: false,
    messageText: '',
    severity: "success"
}

export const messageReducer = createSlice({
    name: 'message',
    initialState,
    reducers: {
        showSuccessMessage: (state, action: PayloadAction<string>) => {
            state.isMessageOpen = true;
            state.severity = "success";
            state.messageText = action.payload;
        },
        showErrorMessage: (state, action: PayloadAction<string>) => {
            state.isMessageOpen = true;
            state.severity = "error";
            state.messageText = action.payload;
        },
        closeMessage: (state) => {
            state.isMessageOpen = false;
        }
    },
    selectors: {
        selectMessageState: (state) => state
    }
});

export const {showSuccessMessage, showErrorMessage, closeMessage} = messageReducer.actions;
export const {selectMessageState} = messageReducer.selectors;