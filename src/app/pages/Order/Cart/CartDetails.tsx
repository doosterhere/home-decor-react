import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

import {setCartCount} from "../../../store";
import {ROUTES} from "../../../constants";
import {useAppDispatch, useCartRefetch} from "../../../hooks";

const CartDetails = () => {
    const navigator = useNavigate();
    const dispatcher = useAppDispatch();
    const cart = useCartRefetch();
    const totalAmount = 0;

    useEffect(() => {
        dispatcher(setCartCount(cart.itemsCount));
    }, [cart, dispatcher]);

    return (
        <div className="cart__details">
            <div className="cart__details-info">
                <div className="cart__details-info-title">Ваш заказ</div>

                <div className="cart__details-info-item first">
                    <div className="cart__detail-info-item-text">Товаров:</div>
                    <div className="cart__detail-info-item-data">{cart.itemsCount}</div>
                </div>

                <div className="cart__details-info-item">
                    <div className="cart__detail-info-item-text">Общая стоимость:</div>
                    <div className="cart__detail-info-item-data">{totalAmount} BYN</div>
                </div>

                <div className="cart__detail-info-note">* без учёта доставки</div>
            </div>
            <div className="cart__details-actions">
                <button className="button button_transparent"
                        onClick={() => navigator(ROUTES.CATALOG)}>
                    Продолжить покупки
                </button>
                <button className="button"
                        onClick={() => navigator(ROUTES.ORDER)}>
                    Оформить заказ
                </button>
            </div>
        </div>
    );
};

export default CartDetails;