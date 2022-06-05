export const OPEN_DETAIL = 'OPEN_DETAIL';
export const CLOSE_DETAIL = 'CLOSE_DETAIL';

export function setPickedIngredient(item) {
    return {
        type: OPEN_DETAIL,
        ingredient: item,
    };
}

export function closeDetailModal() {
    return {
        type: CLOSE_DETAIL,
    };
}