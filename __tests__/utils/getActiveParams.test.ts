import {getActiveParams} from '../../src/app/utils';
import {activeParamsMock, searchParamsMock} from "../../__mocks__/utils/activeParams.mock";
import {ActiveParamsType} from "../../src/app/types";

describe('getActiveParams', () => {
    it('should return an object with the active params from the search params', () => {
        const activeParams = getActiveParams(searchParamsMock);

        expect(activeParams).toEqual(activeParamsMock);
    });

    it('should return an empty object if there are nothing in the search params', () => {
        const params = new URLSearchParams();

        const activeParams: ActiveParamsType = getActiveParams(params);

        expect(activeParams).toEqual({types: []});
    });
});