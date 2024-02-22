export type CartType = {
    items: CartItemType[]
}

export type CartItemType = {
    product: CartProductType,
    quantity: number
}

export type CartProductType = {
    id: string,
    name: string,
    url: string,
    image: string,
    price: number
}