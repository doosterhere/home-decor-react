import React from 'react';
import {useNavigate} from "react-router-dom";

import './Favorites.scss';

import {favoritesApi} from "../../../store";
import {ROUTES} from "../../../constants";

import {FavoritesType} from "../../../types";

const Favorites = () => {
    const navigate = useNavigate();
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
                {isRequestSuccess && !(requestData as FavoritesType[]).length &&
                    <div className="favorites__empty">
                        <div>Вы ещё ничего не добавили в избранное</div>
                        <button className="button" onClick={() => navigate(ROUTES.CATALOG)}>Перейти в каталог</button>
                    </div>
                }
                {isRequestSuccess && !!(requestData as FavoritesType[]).length &&
                    <div className="favorites__products">
                        {
                            (requestData as FavoritesType[]).map(product =>
                                <div>{product.name}</div>
                            )
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default Favorites;