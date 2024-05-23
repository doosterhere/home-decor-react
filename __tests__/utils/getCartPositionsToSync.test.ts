import {getCartPositionsToSync} from "../../src/app/utils";
import {cartToSyncMock, fetchedCartMock} from "../../__mocks__/utils/cartPositionToSync.mock";
import {ICartItem} from "../../src/app/types";

describe('getCartPositionToSync', () => {
    it('should return an empty array if no items in the cartToSync', () => {
        const expectedResult: ICartItem[] = [];

        const actualResult = getCartPositionsToSync(fetchedCartMock, {items: []});

        expect(actualResult).toEqual(expectedResult);
    });

    it('should return the cartToSync positions if no items in the fetchedCart', () => {
        const expectedResult: ICartItem[] = [
            {productId: '1', quantity: 5},
            {productId: '2', quantity: 10},
            {productId: '3', quantity: 15}
        ];

        const actualResult = getCartPositionsToSync({items: []}, cartToSyncMock);

        expect(actualResult).toEqual(expectedResult);
    });

    it('should return right cart positions after syncing the cart', () => {
        const expectedResult: ICartItem[] = [
            {productId: '2', quantity: 10},
            {productId: '3', quantity: 15}
        ];

        const actualResult = getCartPositionsToSync(fetchedCartMock, cartToSyncMock);

        expect(actualResult).toEqual(expectedResult);
    });
});