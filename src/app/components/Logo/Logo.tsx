import React, {FC} from 'react';
import {Link} from "react-router-dom";

import {ROUTES} from "../../constants/constants";

export enum colorType {
    white = 'white',
    green = 'green'
}

interface ILogo {
    color?: colorType;
    className: string;
}

const Logo: FC<ILogo> =
    ({
         color = colorType.white,
         className
     }) => {
        return (
            <Link to={ROUTES.HOME} className={className}>
                {color === colorType.green
                    ? <img src='/images/logo-green.png' alt="logo"/>
                    : <img src="/images/logo.png" alt="logo"/>
                }
            </Link>
        )
            ;
    };

export default Logo;