export function formatDate(string) {
    return new Date(string).toLocaleString();
}

export const checkStatus = (status) => {
    if (status === 'done') {
        return 'Создан';
    }
};