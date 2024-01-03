import React, {FC, useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";

import {Pagination as MatPagination} from "@mui/material";

import './Pagination.scss';

import {productAPI} from "../../../store";

import {IActiveParams} from "../Catalog";

const Pagination: FC<IActiveParams> =
    ({
         activeParams,
         setParams
     }) => {
        const search = useLocation().search;
        const [page, setPage] = useState(1);
        const [screenWidth, setScreenWidth] = useState(0);
        const {
            data: productsData
        } = productAPI.useGetProductsQuery(search);

        useEffect(() => {
            setScreenWidth(window.innerWidth);
            window.addEventListener('resize', () => setScreenWidth(window.innerWidth));

            return () => {
                window.removeEventListener('resize', () => setScreenWidth(window.innerWidth));
            }
        }, []);

        useEffect(() => {
            setPage(activeParams.page || 1);
        }, [activeParams.page]);

        const scrollToElement = (id: string) => {
            const element = document.getElementById(id);

            if (element) {
                element.scrollIntoView({behavior: 'smooth'});
            }
        }

        const handleOpen = (event: React.ChangeEvent<unknown>, page: number) => {
            if (page === activeParams.page || (page === 1 && !activeParams.page)) return;

            setParams(current => ({...current, page: page}));

            if (screenWidth > 1023) {
                scrollToElement('catalog-title');
                return;
            }

            scrollToElement('catalog-items');
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

export default Pagination;