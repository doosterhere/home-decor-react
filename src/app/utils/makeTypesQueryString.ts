import {TypeType} from "../types/type.type";

function makeTypesQueryString(paramsArray: Partial<TypeType>[]): string {
    return '?' + paramsArray.map(param => 'types=' + param.url).join('&');
}

export default makeTypesQueryString;