import React, {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    FC,
    KeyboardEvent,
    memo,
    MouseEvent,
    PropsWithChildren
} from "react";

import classNames from "classnames";
import CircularProgress from "@mui/material/CircularProgress";

import './Button.scss';

interface IButtonProps extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>> {
    onClick?: (event: MouseEvent<HTMLButtonElement>
        | KeyboardEvent<HTMLButtonElement>
        | MouseEvent<HTMLAnchorElement>) => void;
    className?: string;
    disabled?: boolean;
    isLoading?: boolean;
}

export const Button: FC<IButtonProps> = memo(
    ({
         children = 'Default button',
         onClick,
         className = '',
         disabled = false,
         isLoading = false,
         ...attributes
     }) => {
        const classes = classNames('button', className);

        const handle = (event: MouseEvent<HTMLButtonElement>
            | KeyboardEvent<HTMLButtonElement>
            | MouseEvent<HTMLAnchorElement>) => {
            if (!isLoading && onClick) {
                onClick(event);
            }
        };

        const renderButton = (
            <button
                className={classes}
                disabled={disabled}
                onClick={handle}
                {...attributes}
            >
                {isLoading
                    ? <CircularProgress color="inherit" size={24}/>
                    : children
                }
            </button>
        );

        const renderAnchor = (
            <a
                className={classes}
                onClick={handle}
                {...attributes}
            >
                {children}
            </a>
        );

        return attributes.href ? renderAnchor : renderButton;
    });