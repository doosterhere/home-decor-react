export const ROUTES = {
    HOME: '/',
    INFO: '/#info',
    REVIEWS: '/#reviews',
    CATALOG: '/catalog',
    PRODUCT: '/product',
    LOGIN: '/login',
    SIGNUP: '/signup',
    PROFILE: '/profile',
    FAVORITES: '/favorites',
    CART: '/cart',
    TERMS: '/terms'
}

export const MENU = [
    {
        name: 'Главная',
        link: ROUTES.HOME
    },
    {
        name: 'Каталог',
        link: ROUTES.CATALOG
    },
    {
        name: 'Доставка и оплата',
        link: ROUTES.INFO
    },
    {
        name: 'Отзывы',
        link: ROUTES.REVIEWS
    },
];

export const BASE_API = process.env.NODE_ENV === 'production'
    ? "https://home-decor-backend.vercel.app/api/"
    : "http://localhost:3000/api/";
export const SERVER_STATIC_PATH = process.env.NODE_ENV === 'production'
    ? "https://home-decor-backend.vercel.app/images/products/"
    : "http://localhost:3000/images/products/";

export const SORTING_OPTIONS: { name: string, value: string }[] = [
    {name: 'От А до Я', value: 'az-asc'},
    {name: 'От Я до А', value: 'az-desc'},
    {name: 'По возрастанию цены', value: 'price-asc'},
    {name: 'По убыванию цены', value: 'price-desc'},
];

export const BURGER_POINT = 1024;