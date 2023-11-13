import React, {FC, PropsWithChildren, SetStateAction, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

import './ProductCard.scss';

import environment from "../../../environments/environment";
import {ProductType} from "../../types/product.type";
import CountSelector from "../count-selector/CountSelector";

interface IProductCardProps extends PropsWithChildren {
    product: ProductType | null;
    isLogged?: boolean;
    isLight?: boolean;
}

const ProductCard: FC<IProductCardProps> =
    ({
         product,
         isLogged,
         isLight
     }) => {
        const serverStaticPath = environment.serverStaticPath;
        const [count, setCount] = useState(1);
        const navigator = useNavigate();
        let countInCart = 0;

        const navigate = () => {
            if (isLight && product) {
                navigator('/product/' + product.url);
            }
        };

        const updateCount = (value: SetStateAction<number>) => {
            setCount(value);
            if (countInCart) {
                addToCart();
            }
        };

        const updateFavorites = () => {
        };

        const removeFromCart = () => {
        };

        const addToCart = () => {
        };

        if (product) {
            return (
                <div onClick={navigate} className={isLight ? "product-card is-light" : "product-card"}>
                    {(isLogged && !isLight) &&
                        <div className="product-card__favorite" onClick={updateFavorites}>
                            {!product.inFavorites &&
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">

                                    <path
                                        d="M11.9997 20.8457C11.7155 20.8457 11.4405 20.8091 11.2113 20.7266C7.70967 19.5257 2.14551 15.2632 2.14551 8.96572C2.14551 5.75739 4.73967 3.15405 7.92967 3.15405C9.47884 3.15405 10.9272 3.75905 11.9997 4.84072C13.0722 3.75905 14.5205 3.15405 16.0697 3.15405C19.2597 3.15405 21.8538 5.76655 21.8538 8.96572C21.8538 15.2724 16.2897 19.5257 12.788 20.7266C12.5588 20.8091 12.2838 20.8457 11.9997 20.8457ZM7.92967 4.52905C5.50051 4.52905 3.52051 6.51822 3.52051 8.96572C3.52051 15.2266 9.54301 18.7099 11.6605 19.4341C11.8255 19.4891 12.183 19.4891 12.348 19.4341C14.4563 18.7099 20.488 15.2357 20.488 8.96572C20.488 6.51822 18.508 4.52905 16.0788 4.52905C14.6855 4.52905 13.393 5.17989 12.5588 6.30739C12.3022 6.65572 11.7155 6.65572 11.4588 6.30739C10.6063 5.17072 9.32301 4.52905 7.92967 4.52905Z"
                                        fill="#383838"/>
                                </svg>
                            }
                            {product.inFavorites &&
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M11.9997 20.846C11.7155 20.846 11.4405 20.8093 11.2113 20.7268C7.70967 19.526 2.14551 15.2635 2.14551 8.96596C2.14551 5.75763 4.73967 3.1543 7.92967 3.1543C9.47884 3.1543 10.9272 3.7593 11.9997 4.84096C13.0722 3.7593 14.5205 3.1543 16.0697 3.1543C19.2597 3.1543 21.8538 5.7668 21.8538 8.96596C21.8538 15.2726 16.2897 19.526 12.788 20.7268C12.5588 20.8093 12.2838 20.846 11.9997 20.846ZM7.92967 4.5293C5.50051 4.5293 3.52051 6.51846 3.52051 8.96596C3.52051 15.2268 9.54301 18.7101 11.6605 19.4343C11.8255 19.4893 12.183 19.4893 12.348 19.4343C14.4563 18.7101 20.488 15.236 20.488 8.96596C20.488 6.51846 18.508 4.5293 16.0788 4.5293C14.6855 4.5293 13.393 5.18013 12.5588 6.30763C12.3022 6.65596 11.7155 6.65596 11.4588 6.30763C10.6063 5.17096 9.32301 4.5293 7.92967 4.5293Z"
                                        fill="#F3F3F3"/>
                                    <path
                                        d="M7.92967 4.5293C5.50051 4.5293 3.52051 6.51846 3.52051 8.96596C3.52051 15.2268 9.54301 18.7101 11.6605 19.4343C11.8255 19.4893 12.183 19.4893 12.348 19.4343C14.4563 18.7101 20.488 15.236 20.488 8.96596C20.488 6.51846 18.508 4.5293 16.0788 4.5293C14.6855 4.5293 13.393 5.18013 12.5588 6.30763C12.3022 6.65596 11.7155 6.65596 11.4588 6.30763C10.6063 5.17096 9.32301 4.5293 7.92967 4.5293Z"
                                        fill="#B6D5B9"/>
                                </svg>
                            }
                        </div>
                    }
                    <div className="product-card__image"
                         style={{backgroundImage: `url(${serverStaticPath + product.image})`}}></div>
                    <div className="product-card__name">{product.name}</div>
                    {!isLight &&
                        <div className="product-card__info">
                            <div className="product-card__price">{product.price} BYN</div>
                            <div className="product-card__action">
                                {countInCart === 0 &&
                                    <button className="button" onClick={addToCart}>В корзину</button>
                                }
                                {countInCart > 0 &&
                                    <button className="button button_transparent button_in-cart"
                                            onClick={removeFromCart}>
                                        <span>В корзине</span>
                                        <span>Удалить</span>
                                    </button>
                                }
                            </div>
                        </div>
                    }
                    {!isLight &&
                        <div className="product-card__extra">
                            <CountSelector count={count} updateCount={updateCount}/>
                            <Link to={`/product/${product.url}`} className="product-card__detail">
                                <svg width="18" height="4" viewBox="0 0 18 4" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="2.66699" cy="2" r="2" fill="#9AA89B"/>
                                    <circle cx="9.33398" cy="2" r="2" fill="#9AA89B"/>
                                    <circle cx="16" cy="2" r="2" fill="#9AA89B"/>
                                </svg>
                                <span>Подробнее</span>
                            </Link>
                        </div>
                    }
                </div>
            );
        }

        return (
            <div></div>
        );
    };

export default ProductCard;