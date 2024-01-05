import React, {FC, useState} from 'react';
import {useLocation} from "react-router-dom";

import {cartAPI, productAPI} from "../../store";

import {CartType} from "../../types/cart.type";
import {IActiveParams} from "../../types/iactive-params.interface";


import ProductCard from "../../components/ProductCard/ProductCard";
import FilterList from "../../components/FilterList/FilterList";

interface ICatalogLayout extends IActiveParams {
    isLogged: boolean;
}

const CatalogLayout: FC<ICatalogLayout> =
    ({
         activeParams,
         setParams,
         isLogged
     }) => {
        const search = useLocation().search;

        const [updateCart] = cartAPI.useUpdateCartMutation();
        const {
            data: productsData,
            isSuccess: productsRequestSuccess,
        } = productAPI.useGetProductsQuery(search);

        const [cart, setCart] = useState<CartType | null>(null);

        return (
            <div className='catalog__layout'>
                <FilterList
                    activeParams={activeParams}
                    setParams={setParams}
                />
                {(productsData && productsRequestSuccess) &&
                    <div className='catalog__items' id='catalog-items'>
                        {
                            productsData.items.map(item =>
                                <ProductCard
                                    key={item.id}
                                    product={item}
                                    isLogged={isLogged}
                                    countInCart={!!item.countInCart ? item.countInCart : 0}
                                    updateCart={updateCart}/>
                            )
                        }
                    </div>
                }
                {(!!productsData && !productsData.totalCount && productsRequestSuccess) &&
                    <div>Ничего не найдено. Попробуйте изменить параметры поиска</div>
                }
            </div>
        );
    };

export default CatalogLayout;