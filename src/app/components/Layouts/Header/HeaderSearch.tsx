import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

import {LocalFlorist} from "@mui/icons-material";

import {productAPI} from "../../../store";

import {ROUTES, SERVER_STATIC_PATH} from "../../../constants/constants";
import {useDebounceValue} from "../../../hooks/useDebounce";

import {ProductType} from "../../../types/product.type";

const HeaderSearch = () => {
    const navigator = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const debouncedSearchValue = useDebounceValue(searchValue, 500);
    const [requestValue, setRequestValue] = useState('');
    const [prevRequestValue, setPrevRequestValue] = useState('');
    const [searchResult, setSearchResult] = useState<ProductType[]>([]);
    const [isSearchResultVisible, setIsSearchResultVisible] = useState(false);

    const {
        data: requestData,
        isSuccess: isRequestSuccess,
        isFetching: isRequestFetching
    } = productAPI.useSearchProductsQuery(requestValue, {
        skip: !requestValue
    });

    useEffect(() => {
        document.addEventListener('click', (event) => changeSearchResultVisibility(event));

        return () => {
            document.removeEventListener('click', (event) => changeSearchResultVisibility(event));
        }
    }, []);

    useEffect(() => {
        if (debouncedSearchValue.length < 3) {
            setIsSearchResultVisible(false);
            return;
        }

        setPrevRequestValue(requestValue);
        setRequestValue(debouncedSearchValue);
    }, [debouncedSearchValue]);

    useEffect(() => {
        if (searchResult.length && requestValue === prevRequestValue && debouncedSearchValue.length > 2) {
            setIsSearchResultVisible(true);
        }
    }, [requestValue, prevRequestValue, debouncedSearchValue]);

    useEffect(() => {
        if (isRequestSuccess && !isRequestFetching && requestData?.length) {
            setSearchResult(requestData);
            setIsSearchResultVisible(true);
            return;
        }

        setSearchResult([]);
        setIsSearchResultVisible(false);
    }, [requestData, isRequestSuccess]);

    const changeSearchResultVisibility = (event: MouseEvent) => {
        const target: HTMLElement = event.target as HTMLElement;
        const visible = target.hasAttribute('id')
            && target.attributes.getNamedItem('id')?.value === 'search-input'
            && (target as HTMLInputElement)?.value.length > 2;

        setIsSearchResultVisible(visible);
    };

    return (
        <div className='header__bottom-search'>
            <div className="header__bottom-search-reset"
                 onClick={() => setSearchValue('')}
            >
                <LocalFlorist/>
            </div>
            <input
                type="text"
                name="search"
                id='search-input'
                placeholder="Начните искать"
                autoComplete='off'
                value={searchValue ?? ''}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            {isSearchResultVisible && !!searchResult?.length &&
                <div className="search-result">
                    {
                        searchResult.map(item =>
                            <div
                                className="search-result__item"
                                key={item.id}
                                onClick={() => navigator(`${ROUTES.PRODUCT}/${item.url}`)}
                            >
                                <div className="search-result__item-image"
                                     style={{backgroundImage: `url(${SERVER_STATIC_PATH + item.image})`}}
                                ></div>
                                <div className="search-result__item-name">{item.name}</div>
                            </div>
                        )
                    }
                </div>
            }
        </div>
    );
};

export default HeaderSearch;