import React from 'react';
import {useNavigate} from "react-router-dom";

import './Cart.scss';

import {selectCart} from "../../../store";
import {ROUTES} from "../../../constants";
import {useAppSelector} from "../../../hooks";

import CartProducts from "./CartProducts";
import CartDetails from "./CartDetails";

const Cart = () => {
    const navigator = useNavigate();
    const cart = useAppSelector(selectCart);

    return (
        <div className="cart">
            <div className="container">
                <div className="cart__title">Корзина</div>

                {cart.items.length === 0 &&
                    <div className="cart__cart-is-empty-info">
                        <div>В корзине пусто</div>
                        <button className="button" onClick={() => navigator(ROUTES.CATALOG)}>Перейти в каталог</button>
                    </div>
                }

                {cart.items.length > 0 &&
                    <div className="cart__info">
                        <CartProducts/>
                        <CartDetails/>
                    </div>
                }
            </div>
        </div>
    );
};

export default Cart;