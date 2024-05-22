import {makeTypesQueryString} from "../../src/app/utils";
import {TypeType} from "../../src/app/types";

describe('makeTypesQueryString', () => {
    it('should make a types query string correctly', () => {
        const paramsArray: Partial<TypeType>[] = [
            {
                name: 'type1',
                url: 'type1'
            },
            {
                name: 'type2',
                url: 'type2'
            },
            {
                name: 'type3',
                url: 'type3'
            },
        ];
        const expectedString = '?types=type1&types=type2&types=type3';

        expect(makeTypesQueryString(paramsArray)).toBe(expectedString);
    });

    it('should return an empty string if types array is empty', () => {
        expect(makeTypesQueryString([])).toBe('');
    });
});