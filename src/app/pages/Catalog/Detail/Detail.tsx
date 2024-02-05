import React from 'react';
import {useParams} from "react-router-dom";

import './Detail.scss';

import {productAPI} from "../../../store";
import {SERVER_STATIC_PATH} from "../../../constants";
import {useScrollToAnchor} from "../../../hooks";

import DetailRecommendedProducts from "./DetailRecommendedProducts";
import DetailInfo from "./DetailInfo";

const Detail = () => {
    const params = useParams();
    const {data: product} = productAPI.useGetProductQuery(params['url'] as string);

    useScrollToAnchor();

    return (
        <div className='detail'>
            {!!product &&
                <div className='container'>
                    <div>
                        <div className='detail__title'>{product.name}</div>
                        <div className='detail__product'>
                            <div
                                className='detail__image'
                                style={{backgroundImage: `url(${SERVER_STATIC_PATH}${product.image})`}}
                            />
                            <DetailInfo/>
                        </div>
                    </div>
                    <DetailRecommendedProducts/>
                </div>
            }
        </div>
    );
};

export default Detail;