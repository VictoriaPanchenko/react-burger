const baseUrl = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
};

export const registerNewUser = (name, email, password) => {
    return fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then(checkResponse);
  }

export const getInitialIngredients = () => {
    return fetch(`${baseUrl}/ingredients`)
        .then(res => checkResponse(res))
}

export const postOrder = (productIds) => {
    return fetch(`${baseUrl}/orders`, {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        method: 'POST',
        body: JSON.stringify({ ingredients: productIds })
    })
        .then(checkResponse)
}

export const sendEmailToRestorePassword = (email) => {
    return fetch(`${baseUrl}/password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
        }),
    }).then(res => checkResponse(res))
}

export const updatePassword = (password, token) => {
    return fetch(`${baseUrl}/password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password,
            token,
        }),
    }).then(checkResponse);
}