import {enqueueErrorMessage, favoritesApi} from "../store";
import {useAppDispatch} from "./redux";

import {FavoritesType, ProductType} from "../types";

export function useFavoritesInteractions(product: ProductType | FavoritesType| null | undefined, isInFavorites?: boolean | undefined) {
    const [add, {isLoading: isAdding}] = favoritesApi.useAddToFavoritesMutation();
    const [remove, {isLoading: isRemoving}] = favoritesApi.useRemoveFromFavoritesMutation();
    const dispatcher = useAppDispatch();

    async function removeFromFavorites() {
        if (product) {
            try {
                await remove(product.id).unwrap();
            } catch (e) {
                dispatcher(enqueueErrorMessage('Не удалось удалить товар из избранного'));
            }
        }
    }

    async function addToFavorites() {
        if (product) {
            try {
                await add(product.id).unwrap();
            } catch (e) {
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

    return {addToFavorites, removeFromFavorites, updateFavorites, isUpdating: isAdding || isRemoving};
}