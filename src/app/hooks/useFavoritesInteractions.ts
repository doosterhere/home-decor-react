import {enqueueErrorMessage, favoritesApi} from "../store";
import {useAppDispatch} from "./redux";

import {ProductType} from "../types";

export function useFavoritesInteractions(product: ProductType | null | undefined, isInFavorites?: boolean | undefined) {
    const [add] = favoritesApi.useAddToFavoritesMutation();
    const [remove] = favoritesApi.useRemoveFromFavoritesMutation();
    const dispatcher = useAppDispatch();

    async function removeFromFavorites() {
        if (product) {
            try {
                const result = await remove(product.id);

                if ((result && 'error' in result) ||
                    (result && 'data' in result && 'error' in result.data && result.data.error)) {
                    dispatcher(enqueueErrorMessage('Не удалось удалить товар из избранного'));
                }
            } catch (error) {
                dispatcher(enqueueErrorMessage('Не удалось удалить товар из избранного'));
            }
        }
    }

    async function addToFavorites() {
        if (product) {
            try {
                const result = await add(product.id);

                if ((result && 'error' in result && 'status' in result.error && result.error.status === 400) ||
                    (result && 'data' in result && 'error' in result.data && result.data.error)) {
                    dispatcher(enqueueErrorMessage('Не удалось добавить товар в избранное'));
                }
            } catch (error) {
                dispatcher(enqueueErrorMessage('Не удалось добавить товар в избранное'));
            }
        }
    }

    async function updateFavorites() {
        if (isInFavorites === true) {
            await removeFromFavorites();

            return;
        }

        await addToFavorites();
    }

    return {addToFavorites, removeFromFavorites, updateFavorites};
}