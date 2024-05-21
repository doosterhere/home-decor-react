import React, {useEffect} from 'react';

import './Favorites.scss';

import {favoritesApi, setCartCount} from "../../../store";
import {useAppDispatch, useCartRefetch} from "../../../hooks";

import {FavoritesType} from "../../../types";

import FavoritesProductsList from "./FavoritesProductsList";

const Favorites = () => {
    const {
        data: requestData,
        isSuccess: isRequestSuccess,
        isError: isRequestError
    } = favoritesApi.useGetFavoritesQuery();
    const dispatcher = useAppDispatch();
    const cart = useCartRefetch();

    useEffect(() => {
        dispatcher(setCartCount(cart.itemsCount));
    }, [cart, dispatcher]);

    return (
        <div className="favorites">
            <div className="container">
                <div className="favorites__title">Избранное</div>
                {isRequestError &&
                    <div className="favorites__error">
                        <div>Не удалось загрузить данные, попробуйте позже</div>
                    </div>
                }
                <FavoritesProductsList
                    data={requestData as FavoritesType[]}
                    isRequestSuccess={isRequestSuccess}
                />
            </div>
        </div>
    );
};

export default Favorites;