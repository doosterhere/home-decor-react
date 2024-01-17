import React from 'react';

import "./Footer.scss";

import {closeMessage} from "../../../store";
import {useAppDispatch} from "../../../hooks";

import Logo, {colorType} from "../../Logo/Logo";
import FooterMenu from "./FooterMenu";
import FooterCategory from "./FooterCategory";
import FooterInfo from "./FooterInfo";
import FooterContacts from "./FooterContacts";
import Message from "../../Message/Message";

const Footer = () => {
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

export default Footer;