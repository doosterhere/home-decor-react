import React from 'react';

import './Favorites.scss';

import {favoritesApi} from "../../../store";

import {FavoritesType} from "../../../types";

import FavoritesProductsList from "./FavoritesProductsList";

const Favorites = () => {
    const {
        data: requestData,
        isSuccess: isRequestSuccess,
        isError: isRequestError
    } = favoritesApi.useGetFavoritesQuery();

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