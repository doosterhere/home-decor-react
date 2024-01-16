import React, {FC} from 'react';

import CircularProgress from "@mui/material/CircularProgress";

import './Loader.scss';

interface ILoader {
    isLoading: boolean;
}

const Loader: FC<ILoader> = ({isLoading}) => {
    return (
        <div className='overlay' style={{display: isLoading ? 'flex' : 'none'}}>
            <CircularProgress/>
        </div>
    );
};

export default Loader;