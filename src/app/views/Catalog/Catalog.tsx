import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useSearchParams} from "react-router-dom";

import './Catalog.scss';

import {useDebounceValue} from "../../hooks/useDebounce";
import {getActiveParams} from "../../utils/getActiveParams";
import {serializeActiveParams} from "../../utils/serializeActiveParams";

import {FavoritesType} from "../../types/favorites.type";
import {ProductType} from "../../types/product.type";
import {ActiveParamsType} from "../../types/active-params.type";

import CatalogHead from "./CatalogHead/CatalogHead";
import CatalogLayout from "./CatalogLayout/CatalogLayout";
import Pagination from "./Pagination/Pagination";

export interface IActiveParams {
    activeParams: ActiveParamsType;
    setParams: (state: ActiveParamsType | ((prevState: ActiveParamsType) => ActiveParamsType)) => void;
}

const Catalog = () => {
    const [favorites, setFavorites] = useState<FavoritesType[] | null>(null);
    const [products, setProducts] = useState<ProductType[]>([]);
    const [isLogged, setIsLogged] = useState(false);
    const [activeParams, setActiveParams] = useState<ActiveParamsType>({});
    const [searchParams, setSearchParams] = useSearchParams();
    const debouncedActiveParams = useDebounceValue<ActiveParamsType>(activeParams, 750);
    const [sortingOpen, setSortingOpen] = useState(false);
    const isNotFirstRender = useRef(false);

    useEffect(() => {
        setActiveParams(getActiveParams(searchParams));
    }, []);

    useEffect(() => {
        if (!searchParams.get('diameterFrom') && !searchParams.get('diameterTo')
            && !searchParams.get('heightFrom') && !searchParams.get('heightTo')
            && searchParams.get('types')) {
            setActiveParams(getActiveParams(searchParams));
        }

        if (!searchParams.size) {
            const newParams: ActiveParamsType = {};
            setActiveParams(newParams);
        }
    }, [searchParams]);

    useLayoutEffect(() => {
        if (isNotFirstRender.current) {
            setSearchParams(serializeActiveParams(debouncedActiveParams));
        }

        isNotFirstRender.current = true;
    }, [debouncedActiveParams]);

    const setParams = (state: ActiveParamsType | ((prevState: ActiveParamsType) => ActiveParamsType)) => {
        setActiveParams(state);
    }

    const setSortingState = (state: boolean | ((prevState: boolean) => boolean)) => {
        setSortingOpen(state);
    }

    return (
        <div className='catalog' onClick={() => setSortingOpen(false)}>
            <div className='container'>
                <div className='catalog__title' id='catalog-title'>Каталог</div>
                <CatalogHead
                    sortingOpen={sortingOpen}
                    setSortingState={setSortingState}
                    activeParams={activeParams}
                    setParams={setParams}
                />
                <CatalogLayout
                    isLogged={isLogged}
                    activeParams={activeParams}
                    setParams={setParams}
                />
                <Pagination
                    activeParams={activeParams}
                    setParams={setParams}
                />
            </div>
        </div>
    )
        ;
};

export default Catalog;