import {ActiveParamsType} from "../types/active-params.type";

export const serializeActiveParams = (activeParams: ActiveParamsType) => {
    let searchString = '?';
    for (const [key, value] of Object.entries(activeParams)) {
        if (Array.isArray(value)) {
            searchString = value.reduce((acc, current) => acc + `${key}=${current}&`, searchString);
            continue;
        }
        searchString += `${key}=${value}&`;
    }

    return searchString.slice(0, -1);
}