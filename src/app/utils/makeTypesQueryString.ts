import {TypeType} from "../types";

export const makeTypesQueryString = (paramsArray: Partial<TypeType>[]): string => {
    if (!paramsArray.length) {
        return '';
    }
    return '?' + paramsArray.map(param => 'types=' + param.url).join('&');
}