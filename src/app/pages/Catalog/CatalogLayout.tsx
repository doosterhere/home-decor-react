import React, {FC, RefObject, useState} from 'react';
import {useLocation} from "react-router-dom";

import {cartAPI, productAPI} from "../../store";
import {useProducts} from "../../hooks/useProducts";

import {CartType, IActiveParams} from "../../types";

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
        const [updateCart] = cartAPI.useUpdateCartMutation();
        const [cart, setCart] = useState<CartType | null>(null);
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
                            products.map(item =>
                                <ProductCard
                                    key={item.id}
                                    product={item}
                                    countInCart={item.countInCart ? item.countInCart : 0}
                                    updateCart={updateCart}/>
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