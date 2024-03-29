import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useSearchParams} from "react-router-dom";

import './Catalog.scss';

import {setCartCount} from "../../store";
import {useAppDispatch, useCartRefetch, useDebounceValue, useMatchMedia} from "../../hooks";
import {getActiveParams, serializeActiveParams} from "../../utils";

import {ActiveParamsType} from "../../types";

import {Pagination} from "../../components";
import CatalogHead from "./CatalogHead";
import CatalogLayout from "./CatalogLayout";

const Catalog = () => {
    const [activeParams, setActiveParams] = useState<ActiveParamsType>({});
    const [searchParams, setSearchParams] = useSearchParams();
    const debouncedActiveParams = useDebounceValue<ActiveParamsType>(activeParams, 750);
    const [sortingOpen, setSortingOpen] = useState(false);
    const isNotFirstRender = useRef(false);
    const titleRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<HTMLDivElement>(null);
    const {isDesktop} = useMatchMedia();
    const dispatcher = useAppDispatch();
    const cart = useCartRefetch();

    useEffect(() => {
        dispatcher(setCartCount(cart.itemsCount));
    }, [cart, dispatcher]);

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
                <div className='catalog__title' ref={titleRef}>Каталог</div>
                <CatalogHead
                    sortingOpen={sortingOpen}
                    setSortingState={setSortingState}
                    activeParams={activeParams}
                    setParams={setParams}
                />
                <CatalogLayout
                    activeParams={activeParams}
                    setParams={setParams}
                    itemsRef={itemsRef}
                />
                <Pagination
                    activeParams={activeParams}
                    setParams={setParams}
                    scrollRef={isDesktop ? titleRef : itemsRef}
                />
            </div>
        </div>
    );
};

export default Catalog;