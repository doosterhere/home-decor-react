import React from 'react';

import "./Footer.scss";

import Logo, {colorType} from "../../Logo/Logo";
import FooterMenu from "./FooterMenu";
import FooterCategory from "./FooterCategory";
import FooterInfo from "./FooterInfo";
import FooterContacts from "./FooterContacts";

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='container'>
                <Logo className={'logo'} color={colorType.green}/>
                <FooterMenu/>
                <FooterCategory/>
                <FooterInfo/>
                <FooterContacts/>
            </div>
        </footer>
    );
};

export default Footer;