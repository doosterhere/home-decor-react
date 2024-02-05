import React from 'react';

import CircularProgress from "@mui/material/CircularProgress";

import './Loader.scss';

export const Loader=() => {
    return (
        <div className='overlay'>
            <CircularProgress/>
        </div>
    );
};