import {CartType} from "../../src/app/types";

export const cartToSyncMock: CartType = {
    items: [
        {
            product: {
                id: '1',
                name: 'Product 1',
                url: 'someAddress',
                image: 'image.png',
                price: 10
            },
            quantity: 5
        },
        {
            product: {
                id: '2',
                name: 'Product 2',
                url: 'someAddress',
                image: 'image.png',
                price: 100
            },
            quantity: 10
        },
        {
            product: {
                id: '3',
                name: 'Product 3',
                url: 'someAddress',
                image: 'image.png',
                price: 1000
            },
            quantity: 15
        }
    ]
};

export const fetchedCartMock: CartType = {
    items: [
        {
            product: {
                id: '1',
                name: 'Product 1',
                url: 'someAddress',
                image: 'image.png',
                price: 10
            },
            quantity: 10
        },
        {
            product: {
                id: '2',
                name: 'Product 2',
                url: 'someAddress',
                image: 'image.png',
                price: 100
            },
            quantity: 5
        },
        {
            product: {
                id: '3',
                name: 'Product 3',
                url: 'someAddress',
                image: 'image.png',
                price: 1000
            },
            quantity: 2
        }
    ]
}