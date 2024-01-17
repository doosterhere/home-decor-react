import {useEffect} from "react";

import {setCategoriesWithTypes, useGetTypesQuery} from "../store";
import {useAppDispatch} from "./redux";

import {CategoryWithTypesType} from "../types";

export function useSetCategories() {
    const dispatch = useAppDispatch();
    const {data: types, isSuccess} = useGetTypesQuery();
    const categories: CategoryWithTypesType[] = [];

    if (isSuccess && Array.isArray(types)) {
        types.forEach(type => {
            const foundType = categories.find(category => category.url === type.category.url);

            if (foundType) {
                foundType.types.push(
                    {
                        id: type.id,
                        name: type.name,
                        url: type.url
                    }
                );
            }

            if (!foundType) {
                categories.push({
                    id: type.category.id,
                    name: type.category.name,
                    url: type.category.url,
                    types: [
                        {
                            id: type.id,
                            name: type.name,
                            url: type.url
                        }
                    ]
                });
            }
        });
    }

    useEffect(() => {
        dispatch(setCategoriesWithTypes(categories));
    }, [dispatch, types]);
}