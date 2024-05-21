import {serializeActiveParams} from "../../src/app/utils";

describe('serializeActiveParams', () => {
    it('should serialize active params correctly', () => {
        const activeParams = {
            types: ['type1', 'type2'],
            heightFrom: 10,
            heightTo: 100,
            diameterFrom: 5,
            diameterTo: 50,
            page: 3
        };

        const serializedActiveParams =
            '?types=type1&types=type2&heightFrom=10&heightTo=100&diameterFrom=5&diameterTo=50&page=3';

        expect(serializeActiveParams(activeParams)).toBe(serializedActiveParams);
    });

    it('should return an empty string if there are no active params', () => {
        expect(serializeActiveParams({})).toBe('');
    });
});