const baseUrl = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
};

const getInitialIngredients = () => {
    return fetch(`${baseUrl}/ingredients`)
        .then(res => checkResponse(res))
}

const postOrder = (productIds) => {
    return fetch(`${baseUrl}/orders`, {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        method: 'POST',
        body: JSON.stringify({ ingredients: productIds })
    })
        .then(checkResponse)
}

export { getInitialIngredients, postOrder };