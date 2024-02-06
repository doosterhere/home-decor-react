import {useLayoutEffect, useState} from "react";

import {useAppSelector} from "./redux";
import {favoritesApi, selectIsLogged} from "../store";

import {FavoritesType, ProductType} from "../types";

export const useProducts = (productData: ProductType[] | undefined) => {
    const isLogged = useAppSelector(selectIsLogged);
    const [products, setProducts] = useState<ProductType[]>([]);
    const {
        data: productsInFavorites,
        isSuccess: isFavoritesRequestSuccess,
        fulfilledTimeStamp: favoritesFulfilledTimeStamp
    } = favoritesApi.useGetFavoritesQuery(undefined, {skip: !isLogged});

    useLayoutEffect(() => {
        if (isFavoritesRequestSuccess && productData && isLogged) {
            setProducts(current => {
                current = structuredClone(productData) as ProductType[];

                return current.map(product => {
                    if ((productsInFavorites as FavoritesType[]).find(item => item.id === product.id)) {
                        product.inFavorites = true;
                    }

                    return product;
                });
            });
        }

        if (productData && !isLogged) {
            setProducts(structuredClone(productData) as ProductType[]);
        }
    }, [isFavoritesRequestSuccess, productData, isLogged, favoritesFulfilledTimeStamp, productsInFavorites]);

    return products;
};