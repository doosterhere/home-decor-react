import React from 'react';
import {useParams} from "react-router-dom";

import './Detail.scss';

import {productAPI} from "../../../store";

import {SERVER_STATIC_PATH} from "../../../constants/constants";
import {useScrollToAnchor} from "../../../hooks/useScrollToAnchor";

import Loader from "../../../components/Loader/Loader";
import DetailRecommendedProducts from "./DetailRecommendedProducts";
import DetailInfo from "./DetailInfo";

const Detail = () => {
    const params = useParams();
    const {data: product, isLoading} = productAPI.useGetProductQuery(params['url'] as string);

    useScrollToAnchor();

    return (
        <div className='detail'>
            <Loader isLoading={isLoading}/>
            {(!isLoading && product) &&
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