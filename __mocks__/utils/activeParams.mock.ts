import {ActiveParamsType} from "../../src/app/types";

export const activeParamsMock: ActiveParamsType = {
    types: ['type1', 'type2', 'type3'],
    heightFrom: 10,
    heightTo: 100,
    diameterFrom: 5,
    diameterTo: 50,
    page: 2,
    sort: 'az-asc',
};

export const searchParamsMock: URLSearchParams = new URLSearchParams();
searchParamsMock.append('types', 'type1');
searchParamsMock.append('types', 'type2');
searchParamsMock.append('types', 'type3');
searchParamsMock.set('heightFrom', '10');
searchParamsMock.set('heightTo', '100');
searchParamsMock.set('diameterFrom', '5');
searchParamsMock.set('diameterTo', '50');
searchParamsMock.set('page', '2');
searchParamsMock.set('sort', 'az-asc');