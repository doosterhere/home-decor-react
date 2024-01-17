import {TypeType} from "../types";

export const makeTypesQueryString = (paramsArray: Partial<TypeType>[]): string => {
    return '?' + paramsArray.map(param => 'types=' + param.url).join('&');
}