import React from 'react';
import {Link} from "react-router-dom";

const FooterContacts = () => {
    return (
        <div className='footer-block contacts__footer-block'>
            <div className='footer-block__name'>Контакты</div>
            <div className='footer-block__contact'>
                <div className='footer-block__contact-head'>Адрес</div>
                <div className='footer-block__contact-info'>
                    г. Минск, ул. Калиновского 61, подъезд 1, офис 6
                </div>
            </div>

            <div className='footer-block__contact'>
                <div className='footer-block__contact-head'>Телефон</div>
                <div className='footer-block__contact-info'>
                    <Link to='tel: +375299222999'>+ 375 (29) 922-29-99</Link>
                </div>
            </div>

            <div className='footer-block__contact'>
                <div className='footer-block__contact-head'>E-mail</div>
                <div className='footer-block__contact-info'>
                    <Link to='mailto: homedecor@gmail.com'>homedecor@gmail.com</Link>
                </div>
            </div>
        </div>
    );
};

export default FooterContacts;