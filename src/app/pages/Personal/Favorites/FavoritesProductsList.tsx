import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";

import {ROUTES} from "../../../constants";

import {FavoritesType} from "../../../types";

interface IFavoriteProductList {
    data: FavoritesType[],
    isRequestSuccess: boolean
}

const FavoritesProductsList: FC<IFavoriteProductList> =
    ({
         data,
         isRequestSuccess
     }) => {
        const navigate = useNavigate();

        return (
            <>
                {isRequestSuccess &&
                    <div className={data?.length ? "favorites__products" : "favorites__empty"}>
                        {!data.length &&
                            <>
                                <div>Вы ещё ничего не добавили в избранное</div>
                                <button className="button" onClick={() => navigate(ROUTES.CATALOG)}>
                                    Перейти в каталог
                                </button>
                            </>
                        }
                        {!!data.length &&
                            data.map(product =>
                                <div>{product.name}</div>
                            )
                        }
                    </div>
                }
            </>
        );
    };

export default FavoritesProductsList;