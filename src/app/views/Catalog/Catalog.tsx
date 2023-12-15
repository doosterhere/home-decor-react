import React, {useEffect, useState} from 'react';

import './Catalog.scss';

import {productAPI} from "../../store";
import {cartAPI} from "../../store";
import {useAppSelector} from "../../hooks/redux";

import {AppliedFilterType} from "../../types/applied-filter.type";
import {ActiveParamsType} from "../../types/active-params.type";
import {FavoritesType} from "../../types/favorites.type";
import {ProductType} from "../../types/product.type";
import {CartType} from "../../types/cart.type";
import {IconName} from "../../types/icon-name.type";

import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import ProductCard from "../../components/ProductCard/ProductCard";
import Icon from "../../components/Icon/Icon";

const Catalog = () => {
    const [cart, setCart] = useState<CartType | null>(null);
    const [favorites, setFavorites] = useState<FavoritesType[] | null>(null);
    const [products, setProducts] = useState<ProductType[]>([]);
    const [pages, setPages] = useState<number[]>([]);
    const [appliedFilters, setAppliedFilters] = useState<AppliedFilterType[]>([]);
    const sortingOptions: { name: string, value: string }[] = [
        {name: 'От А до Я', value: 'az-asc'},
        {name: 'От Я до А', value: 'az-desc'},
        {name: 'По возрастанию цены', value: 'price-asc'},
        {name: 'По убыванию цены', value: 'price-desc'},
    ];
    const [sortingOpen, setSortingOpen] = useState(false);
    const activeParams: ActiveParamsType = {types: []};
    const [isLogged, setIsLogged] = useState(false);
    const {
        data: productsData,
        isSuccess: productsRequestSuccess,
    } = productAPI.useGetProductsQuery(activeParams);
    const {categories} = useAppSelector(state => state.category);
    const [updateCart] = cartAPI.useUpdateCartMutation();

    useEffect(() => {
        // if (productsData && !!productsData.pages) {
        //     let arr: number[] = [];
        //     for (let i = 1; i <= productsData.pages; i++) {
        //         arr.push(i);
        //     }
        //     setPages(arr);
        // }
    }, [products]);

    const processCatalog = () => {
    };

    const removeAppliedFilter = (appliedFilter: AppliedFilterType) => {
    };

    const toggleSorting = () => {
    };

    const sort = (option: string) => {
    };

    const openPage = (page: number) => {
    };

    const openPreviousPage = () => {
    };

    const openNextPage = () => {
    };

    return (
        <div className='catalog'>
            <div className='container'>
                <div className='catalog__title'>Каталог</div>
                <div className='catalog__head'>
                    <div className='catalog__applied-filters'>
                        {
                            appliedFilters.map(appliedFilter => {
                                return (
                                    <div className='catalog__applied-filter'>
                                        <span>{appliedFilter.name}</span>
                                        <a onClick={() => removeAppliedFilter(appliedFilter)}>
                                            <Icon name={IconName.closeCross}/>
                                        </a>
                                    </div>
                                );
                            })
                        }
                    </div>

                    <div className={sortingOpen ? 'catalog__sorting open' : 'catalog__sorting'}
                         onClick={toggleSorting}
                    >
                        <div className='catalog__sorting-head'>
                            <span>Сортировать</span>
                            <Icon name={IconName.list}/>
                        </div>
                        <div className='catalog__sorting-body'>
                            {
                                sortingOptions.map(sortingOption => {
                                    return (
                                        <div className='catalog__sorting-item'
                                             key={sortingOption.name}
                                             onClick={() => sort(sortingOption.value)}
                                            // [className.active]="this.activeParams.sort ? this.activeParams.sort === sortingOption.value : false"
                                        >
                                            {sortingOption.name}
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className='catalog__layout'>
                    <div className='catalog__filters'>
                        {
                            categories.map(category => {
                                return (
                                    <CategoryFilter key={category.id} categoryWithTypes={category}/>
                                );
                            })
                        }
                        <CategoryFilter type={"height"}/>
                        <CategoryFilter type={"diameter"}/>
                    </div>
                    {(!!products.length && productsRequestSuccess) &&
                        <div className='catalog__items'>
                            {
                                products.map(item =>
                                    <ProductCard
                                        key={item.id}
                                        product={item}
                                        isLogged={isLogged}
                                        countInCart={!!item.countInCart ? item.countInCart : 0}
                                        updateCart={updateCart}/>
                                )
                            }
                        </div>
                    }
                    {(!products.length && productsRequestSuccess) &&
                        <div>Ничего не найдено. Попробуйте изменить параметры поиска</div>
                    }
                </div>

                {!!pages.length &&
                    <div className='pagination'>
                        <div className='pagination-arrow'
                             onClick={openPreviousPage}>
                            {/*         /!*[className.disabled]="activeParams.page ? activeParams.page === 1 : true"*!/*/}
                            <Icon name={IconName.arrowBackward}/>
                        </div>

                        <div className='pagination__pages'>
                            {
                                pages.map(page =>
                                    <a className='pagination__page'
                                       key={page}
                                       onClick={() => openPage(page)}>
                                        {/*           /!*[className.active]="activeParams.page ? activeParams.page === page : (page === 1)"*!/*/}
                                        {page}
                                    </a>
                                )
                            }
                        </div>

                        <div className='pagination-arrow' onClick={openNextPage}>
                            {/*        // [className.disabled] = "activeParams.page ? activeParams.page === pages.length : false"*/}
                            {/*    >*/}
                            <Icon name={IconName.arrowForward}/>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Catalog;