import React, {useEffect} from 'react';
import {Link} from "react-router-dom";

import './Cart.scss';

import {setCartCount} from "../../../store";
import {ROUTES} from "../../../constants";
import {useAppDispatch, useCartRefetch} from "../../../hooks";

import CartProducts from "./CartProducts";
import CartDetails from "./CartDetails";
import CartExtraProducts from "./CartExtraProducts";

const Cart = () => {
    const dispatcher = useAppDispatch();
    const cart = useCartRefetch();

    useEffect(() => {
        dispatcher(setCartCount(cart.itemsCount));
    }, [cart, dispatcher]);

    return (
        <div className="cart">
            <div className="container">
                <div className="cart__title">Корзина</div>

                {cart.items.length === 0 &&
                    <div className="cart__cart-is-empty-info">
                        <div>В корзине пусто</div>
                        <Link to={ROUTES.CATALOG} className="button">
                            Перейти в каталог
                        </Link>
                    </div>
                }

                {cart.items.length > 0 &&
                    <div className="cart__info">
                        <CartProducts/>
                        <CartDetails/>
                    </div>
                }

                <CartExtraProducts/>
            </div>
        </div>
    );
};

export default Cart;