import React, {FC, RefObject, useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";

import {Pagination as MatPagination} from "@mui/material";

import './Pagination.scss';

import {productAPI} from "../../store";

import {IActiveParams} from "../../types";

interface IPagination extends IActiveParams {
    scrollRef: RefObject<HTMLDivElement>
}

export const Pagination: FC<IPagination> =
    ({
         activeParams,
         setParams,
         scrollRef
     }) => {
        const search = useLocation().search;
        const [page, setPage] = useState(1);
        const {
            data: productsData
        } = productAPI.useGetProductsQuery(search);

        useEffect(() => {
            setPage(activeParams.page || 1);
        }, [activeParams.page]);

        const scrollToElement = (ref: RefObject<HTMLDivElement>) => {
            ref.current?.scrollIntoView({behavior: 'smooth'});
        }

        const handleOpen = (event: React.ChangeEvent<unknown>, page: number) => {
            if (page === activeParams.page || (page === 1 && !activeParams.page)) return;

            setParams(current => ({...current, page: page}));

            scrollToElement(scrollRef);
        }

        if (productsData && productsData.pages > 1) {
            return (
                <div className="pagination">
                    <MatPagination
                        count={productsData?.pages ? productsData.pages : 1}
                        page={page}
                        onChange={handleOpen}
                        hideNextButton
                        hidePrevButton
                    />
                </div>
            );
        }

        return (
            <div></div>
        )
    };