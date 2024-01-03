import {ActiveParamsType} from "../types/active-params.type";

export function getActiveParams(params: URLSearchParams,) {
    const activeParams: ActiveParamsType = {};

    if (params.get('types') && !Object.hasOwn(activeParams, 'types')) {
        activeParams.types = [];
    }
    activeParams.types = params.getAll('types');
    params.get('heightFrom') && (activeParams.heightFrom = Number(params.get('heightFrom')));
    params.get('heightTo') && (activeParams.heightTo = Number(params.get('heightTo')));
    params.get('diameterFrom') && (activeParams.diameterFrom = Number(params.get('diameterFrom')));
    params.get('diameterTo') && (activeParams.diameterTo = Number(params.get('diameterTo')));
    params.get('page') && (activeParams.page = Number(params.get('page')));
    params.get('sort') && (activeParams.sort = params.get('sort') as string);

    return activeParams;
}