import React, {FC, PropsWithChildren, SetStateAction} from 'react';

import './CountSelector.scss';

import {IconName} from "../../types/icon-name.type";

import Icon from "../Icon/Icon";

interface ICounterProps extends PropsWithChildren {
    count: number;
    updateCount: (value: SetStateAction<number>) => void;
}

const CountSelector: FC<ICounterProps> = ({count, updateCount}) => {
    const increaseCounter = () => {
        updateCount(count + 1);
    };

    const decreaseCounter = () => {
        if (count > 1) {
            updateCount(count - 1);
        }
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateCount(parseInt(e.target.value, 10) || count);
    };

    return (
        <div className='count-selector'>
            <div onClick={decreaseCounter}>
                <Icon name={IconName.minus} needHover/>
            </div>
            <input type="text" name="counter" className='small-input'
                   value={count}
                   onChange={(e) => onChangeHandler(e)}/>
            <div onClick={increaseCounter}>
                <Icon name={IconName.plus} needHover/>
            </div>
        </div>
    );
};

export default CountSelector;