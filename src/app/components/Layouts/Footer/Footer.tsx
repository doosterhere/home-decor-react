import React from 'react';

import "./Footer.scss";

import {closeMessage} from "../../../store";
import {useAppDispatch} from "../../../hooks";

import FooterMenu from "./FooterMenu";
import FooterCategory from "./FooterCategory";
import FooterInfo from "./FooterInfo";
import FooterContacts from "./FooterContacts";
import {Logo, colorType, Message} from '../../../components';

export const Footer = () => {
    const dispatcher = useAppDispatch();

    const handleClose = () => {
        dispatcher(closeMessage());
    }

    return (
        <footer className='footer'>
            <div className='container'>
                <Logo className={'logo'} color={colorType.green}/>
                <FooterMenu/>
                <FooterCategory/>
                <FooterInfo/>
                <FooterContacts/>
                <Message
                    closeMessage={handleClose}
                />
            </div>
        </footer>
    );
};