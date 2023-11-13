import React, {FC, PropsWithChildren, SetStateAction} from 'react';

import './CountSelector.scss';

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
        <div className="count-selector">
            <div onClick={decreaseCounter}>
                <svg width="10" height="3" viewBox="0 0 10 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.14019 3V0H0V3H9.14019Z" fill="#9AA89B"/>
                </svg>
            </div>
            <input type="text" className="small-input"
                   value={count}
                   onChange={(e) => onChangeHandler(e)}/>
            <div onClick={increaseCounter}>
                <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M7.34934 12V7.20896H12.1406V4.81343H7.34934V0H4.95369V4.81343H0.140625V7.20896H4.95369V12H7.34934Z"
                        fill="#9AA89B"/>
                </svg>
            </div>
        </div>
    );
};

export default CountSelector;