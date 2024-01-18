import React, {FC, PropsWithChildren, SetStateAction} from 'react';

import './CountSelector.scss';

import {IconName} from "../../types";

import {Icon} from "../../components";

interface ICounterProps extends PropsWithChildren {
    count: number;
    updateCount: (value: SetStateAction<number>) => void;
}

export const CountSelector: FC<ICounterProps> = ({count, updateCount}) => {
    const increaseCounter = () => {
        updateCount(count + 1);
    };

    const decreaseCounter = () => {
        if (count > 1) {
            updateCount(count - 1);
        }
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateCount(parseInt(e.target.value, 10) > 0
            ? parseInt(e.target.value, 10)
            : 1
        );
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