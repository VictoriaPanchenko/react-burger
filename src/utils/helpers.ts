export function formatDate(string: string) {
    return new Date(string).toLocaleString();
}

export const checkStatus = (status: string) => {
    if (status === 'done') {
        return 'Создан';
    }
};