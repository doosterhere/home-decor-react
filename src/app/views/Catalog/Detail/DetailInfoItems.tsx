import React from 'react';
import {useParams} from "react-router-dom";

import {productAPI} from "../../../store";

import {IconName} from "../../../types";

import Icon from "../../../components/Icon/Icon";

const DetailInfoItems = () => {
    const params = useParams();
    const {data: product} = productAPI.useGetProductQuery(params['url'] as string);

    if (product?.temperature || product?.humidity || product?.lightning) {
        return (
            <div className='detail__info-items'>
                {!!product.lightning &&
                    <div className='detail__info-item'>
                        <div>
                            <Icon name={IconName.lighting}/>
                        </div>
                        <div className='detail__info-item-text'>
                            <div className='detail__info-item-title'>Освещение</div>
                            <div
                                className='detail__info-item-description'>{product.lightning}</div>
                        </div>
                    </div>
                }

                {!!product.humidity &&
                    <div className='detail__info-item'>
                        <div>
                            <Icon name={IconName.humidity}/>
                        </div>
                        <div className='detail__info-item-text'>
                            <div className='detail__info-item-title'>Влажность</div>
                            <div className='detail__info-item-description'>
                                {product.humidity}
                            </div>
                        </div>
                    </div>
                }

                {!!product.temperature &&
                    <div className='detail__info-item'>
                        <div>
                            <Icon name={IconName.temperature}/>
                        </div>
                        <div className='detail__info-item-text'>
                            <div className='detail__info-item-title'>Температура</div>
                            <div
                                className='detail__info-item-description'>{product.temperature}</div>
                        </div>
                    </div>
                }
            </div>
        );
    }

    return (
        <div></div>
    );
};

export default DetailInfoItems;