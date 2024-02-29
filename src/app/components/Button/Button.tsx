import React, {FC, PropsWithChildren} from 'react';

const Button: FC<PropsWithChildren> = ({children, ...attributes}) => {
    return (
        <div>
            <button {...attributes}>
                {children}
            </button>
        </div>
    );
};

export default Button;