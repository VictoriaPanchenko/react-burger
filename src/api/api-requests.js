import { baseUrl } from "../utils/constants";

const checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
};

export const getUserInfo = (accessToken) => {
    return fetch(`${baseUrl}/auth/user`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: accessToken,
      },
    }).then(checkResponse);
  }

  export const updateUserInfo = (accessToken, name, email, password) => {
    return fetch(`${baseUrl}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: accessToken,
      },
      body: JSON.stringify({
        email: email,
        name: name,
        password: password,
      }),
    }).then(checkResponse);
  }

//accessToken (for auth/user), refreshToken
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

//accessToken (for auth/user), refreshToken
  export const login = (email, password) => {
    return fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(checkResponse);
  }

  export const logout = (refreshToken) => {
    return fetch(`${baseUrl}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: refreshToken
      }),
    }).then(checkResponse);
  }

  //accessToken (for auth/user), refreshToken
  export const refreshToken = (refreshToken) => {
    return fetch(`${baseUrl}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: refreshToken
      }),
    }).then(checkResponse);
  }

export const getInitialIngredients = () => {
    return fetch(`${baseUrl}/ingredients`)
        .then(res => checkResponse(res))
}

export const postOrder = (accessToken, productIds) => {
    return fetch(`${baseUrl}/orders`, {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: accessToken,
        },
        method: 'POST',
        body: JSON.stringify({ ingredients: productIds })
    })
        .then(checkResponse)
}

export const getOrderInfo = (orderNumber) => {
  return fetch(`${baseUrl}/orders/${orderNumber}`).then(checkResponse);
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
    return fetch(`${baseUrl}/password-reset/reset`, {
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