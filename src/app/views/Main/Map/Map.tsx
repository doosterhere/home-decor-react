import React from 'react';

import "./Map.scss";

const Map = () =>
    (
        <section className='map'>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2348.192095535324!2d27.628582077113872!3d53.946095729679506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbcf257bd628cf%3A0xba37622c91fbdd9!2sVulica%20Kalino%C5%ADskaha%2061%2C%20Minsk!5e0!3m2!1sen!2sby!4v1683538393364!5m2!1sen!2sby"
                width="100%"
                height="450"
                title={'map'}
                style={{border: 0}}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </section>
    );

export default Map;