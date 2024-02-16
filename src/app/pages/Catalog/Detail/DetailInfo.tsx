import React from 'react';
import {useParams} from "react-router-dom";

import {productAPI} from "../../../store";

import DetailInfoItems from "./DetailInfoItems";
import DetailInfoActions from "./DetailInfoActions";

const DetailInfo = () => {
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

                <DetailInfoActions/>
            </div>
        );
    }

    return (
        <div>Не удалось загрузить информацию. Попробуйте позже</div>
    );
};

export default DetailInfo;