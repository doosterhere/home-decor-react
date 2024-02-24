import {enqueueErrorMessage, favoritesApi} from "../store";
import {ProductType} from "../types";
import {useAppDispatch} from "./redux";

export function useUpdateFavorites(product: ProductType | null, isInFavorites: boolean | undefined) {
    const [addToFavorites] = favoritesApi.useAddToFavoritesMutation();
    const [removeFromFavorites] = favoritesApi.useRemoveFromFavoritesMutation();
    const dispatcher = useAppDispatch();

    return async function () {
        if (isInFavorites === true && product) {
            try {
                await removeFromFavorites(product.id);
            } catch (error) {
                dispatcher(enqueueErrorMessage('Не удалось удалить товар из избранного'));
            }

            return;
        }

        if (product) {
            try {
                await addToFavorites(product.id);
            } catch (error) {
                dispatcher(enqueueErrorMessage('Не удалось добавить товар в избранное'));
            }
        }
    }
}