import React, {FC} from 'react';
import {Link} from "react-router-dom";

import {ROUTES} from "../../../constants";

import {FavoritesType} from "../../../types";

import FavoritesProduct from "./FavoritesProduct";

interface IFavoriteProductList {
    data: FavoritesType[],
    isRequestSuccess: boolean
}

const FavoritesProductsList: FC<IFavoriteProductList> =
    ({
         data,
         isRequestSuccess
     }) => (
        <>
            {isRequestSuccess &&
                <div className={data?.length ? "favorites__products" : "favorites__empty"}>
                    {!data.length &&
                        <>
                            <div>Вы ещё ничего не добавили в избранное</div>
                            <Link to={ROUTES.CATALOG} className="button">
                                Перейти в каталог
                            </Link>
                        </>
                    }
                    {!!data.length &&
                        data.map(product =>
                            <FavoritesProduct key={product.id} product={product}/>
                        )
                    }
                </div>
            }
        </>
    );

export default FavoritesProductsList;