import React from 'react';
import {Link} from "react-router-dom";

import {selectCart, selectCartCount} from "../../../store";
import {ROUTES} from "../../../constants";
import {useAppSelector} from "../../../hooks";

const CartDetails = () => {
    const cart = useAppSelector(selectCart);
    const totalCount = useAppSelector(selectCartCount);

    const totalAmount = () => {
        return cart.items.reduce(
            (acc, current) => acc + current.product.price * current.quantity, 0
        );
    }

    return (
        <div className="cart__details">
            <div className="cart__details-info">
                <div className="cart__details-info-title">Ваш заказ</div>

                <div className="cart__details-info-item first">
                    <div className="cart__detail-info-item-text">Товаров:</div>
                    <div className="cart__detail-info-item-data">{totalCount}</div>
                </div>

                <div className="cart__details-info-item">
                    <div className="cart__detail-info-item-text">Общая стоимость:</div>
                    <div className="cart__detail-info-item-data">{totalAmount()} BYN</div>
                </div>

                <div className="cart__detail-info-note">* без учёта доставки</div>
            </div>
            <div className="cart__details-actions">
                <Link to={ROUTES.CATALOG} className="button button_transparent">
                    Продолжить покупки
                </Link>
                <Link to={ROUTES.ORDER} className="button">
                    Оформить заказ
                </Link>
            </div>
        </div>
    );
};

export default CartDetails;