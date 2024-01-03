import React, {FC} from 'react';
import {useParams} from "react-router-dom";

import './DetailInfo.scss';

import {productAPI} from "../../../../store";

import {IDetailInfo} from "../Detail";

import DetailInfoItems from "./DetailInfoItems/DetailInfoItems";
import DetailInfoActions from "./DetailInfoActions/DetailInfoActions";

const DetailInfo: FC<IDetailInfo> =
    ({
         isLogged,
     }) => {
        const params = useParams();
        const {data: product} = productAPI.useGetProductQuery(params['url'] as string);

        if (product) {
            return (
                <div className='detail__info'>
                    <DetailInfoItems/>
                    {product.height &&
                        <div className='detail__info-param'>
                            <div className='detail__info-param-name'>Высота:</div>
                            <div>{product.height} см</div>
                        </div>
                    }

                    {product.diameter &&
                        <div className='detail__info-param'>
                            <div className='detail__info-param-name'>Диаметр (горшка):</div>
                            <div>{product.diameter} см</div>
                        </div>
                    }

                    <div className='detail__info-params'>
                        <div className='detail__info-params-count'>
                            <span>Количество: </span>
                            {/*<CountSelector count={} updateCount={} [count]="count" (onCountChange)="updateCount($event)"/>*/}
                        </div>
                        <div className='detail__info-params-price'>{product.price} BYN</div>
                    </div>

                    <DetailInfoActions
                        isLogged={isLogged}
                    />
                </div>
            );
        }

        return (
            <div>Не удалось загрузить информацию. Попробуйте позже</div>
        );
    };

export default DetailInfo;