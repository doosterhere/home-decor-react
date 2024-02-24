import React, {FC, RefObject} from 'react';
import {useLocation} from "react-router-dom";

import {productAPI} from "../../store";
import {useProducts} from "../../hooks";

import {IActiveParams} from "../../types";

import {FilterList, ProductCard} from "../../components";

interface ICatalogLayout extends IActiveParams {
    itemsRef: RefObject<HTMLDivElement>
}

const CatalogLayout: FC<ICatalogLayout> =
    ({
         activeParams,
         setParams,
         itemsRef
     }) => {
        const search = useLocation().search;
        const {
            data: productsData,
            isSuccess: isProductsRequestSuccess,
        } = productAPI.useGetProductsQuery(search);
        const products = useProducts(productsData?.items);

        return (
            <div className='catalog__layout'>
                <FilterList
                    activeParams={activeParams}
                    setParams={setParams}
                />
                {(productsData && isProductsRequestSuccess) &&
                    <div className='catalog__items' ref={itemsRef}>
                        {
                            products.map(product =>
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            )
                        }
                    </div>
                }
                {(!!productsData && !productsData.totalCount && isProductsRequestSuccess) &&
                    <div>Ничего не найдено. Попробуйте изменить параметры поиска</div>
                }
            </div>
        );
    };

export default CatalogLayout;