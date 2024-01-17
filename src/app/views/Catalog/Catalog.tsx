import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useSearchParams} from "react-router-dom";

import './Catalog.scss';

import {useDebounceValue} from "../../hooks";
import {getActiveParams, serializeActiveParams} from "../../utils";

import {FavoritesType, ProductType, ActiveParamsType} from "../../types";

import CatalogHead from "./CatalogHead";
import CatalogLayout from "./CatalogLayout";
import Pagination from "../../components/Pagination/Pagination";

const Catalog = () => {
    const [favorites, setFavorites] = useState<FavoritesType[] | null>(null);
    const [products, setProducts] = useState<ProductType[]>([]);
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