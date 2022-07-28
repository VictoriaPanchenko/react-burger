import { baseUrl } from "../utils/constants";
import { setCookie,getCookie } from "../services/cookie-setting";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};

export const getUserInfo = () => {
    return  fetchWithRefresh(`${baseUrl}/auth/user`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + getCookie('accessToken'),
      },
    })
  }

  export const updateUserInfo = (name, email, password) => {
    return  fetchWithRefresh(`${baseUrl}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + getCookie('accessToken'),
      },
      body: JSON.stringify({
        email: email,
        name: name,
        password: password,
      }),
    })
  }


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

  export const logout = () => {
    return fetchWithRefresh(`${baseUrl}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token:  localStorage.getItem('refreshToken')
      }),
    })
  }

  export const refreshToken = () => {
    return fetch(`${baseUrl}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken')
      }),
    }).then(checkResponse);
  }

export const getInitialIngredients = () => {
    return fetch(`${baseUrl}/ingredients`)
        .then(res => checkResponse(res))
}

export const postOrder = (productIds) => {
    return fetchWithRefresh(`${baseUrl}/orders`, {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: 'Bearer ' + getCookie('accessToken'),
        },
        method: 'POST',
        body: JSON.stringify({ ingredients: productIds })
    })
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

async function fetchWithRefresh(url, options) {
  try {
    const res = await fetch (url, options);
    const data = await checkResponse(res);
    return data;
  } catch (err) {

    if (!err.success) {
        const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      const accessToken = refreshData.accessToken.split('Bearer ')[1];

      localStorage.setItem('refreshToken', refreshData.refreshToken);
      setCookie('accessToken', accessToken);

      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          authorization: refreshData.accessToken,
        }
      });

      const data = await checkResponse(res);
      return data;
    } else {
      return Promise.reject(err);
    }
  }
};