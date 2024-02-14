import React, {FC, RefObject, useEffect} from 'react';
import {useLocation} from "react-router-dom";

import {productAPI, setCartCount} from "../../store";
import {useProducts} from "../../hooks/useProducts";
import {useAppDispatch, useCartRefetch} from "../../hooks";

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
        const dispatcher = useAppDispatch();
        const cart = useCartRefetch();

        useEffect(() => {
            dispatcher(setCartCount(cart.itemsCount));
        }, [cart, dispatcher]);

        return (
            <div className='catalog__layout'>
                <FilterList
                    activeParams={activeParams}
                    setParams={setParams}
                />
                {(productsData && isProductsRequestSuccess) &&
                    <div className='catalog__items' ref={itemsRef}>
                        {
                            products.map(product => {
                                const foundItem = cart.items.find(item => item.productId === product.id);
                                const countInCart = foundItem ? foundItem.quantity : 0;

                                return (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        countInCart={countInCart}
                                    />
                                );
                            })
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