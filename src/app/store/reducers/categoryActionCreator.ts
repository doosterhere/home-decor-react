import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

import getErrorMessage from "../../utils/getErrorMessage";
import {TypeType} from "../../types/type.type";
import environment from "../../../environments/environment";
import {CategoryWithTypesType} from "../../types/categoryWithTypes.type";

export const fetchCategories = createAsyncThunk(
    'categories/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<TypeType[]>(environment.api + 'types');
            const items: TypeType[] = response.data;
            const categories: CategoryWithTypesType[] = [];

            items.forEach(item => {
                const foundItem = categories.find(category => category.url === item.category.url);

                if (foundItem) {
                    foundItem.types.push(
                        {
                            id: item.id,
                            name: item.name,
                            url: item.url
                        }
                    );
                }

                if (!foundItem) {
                    categories.push({
                        id: item.category.id,
                        name: item.category.name,
                        url: item.category.url,
                        types: [
                            {
                                id: item.id,
                                name: item.name,
                                url: item.url
                            }
                        ]
                    });
                }
            });

            return categories;
        } catch (e) {
            return thunkAPI.rejectWithValue(getErrorMessage(e));
        }
    }
);