const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-33',
  headers: {
    authorization: '3c96d569-9b34-4210-be91-2190c5f8004c',
    'Content-Type': 'application/json'
  }
}

// Функция обработки ответа сервера
function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(`Ошибка: ${response.status}`);
}

// Функция отправки на сервер запроса на получение данных о всех карточках
function getCardsData() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(handleResponse);
}

// Функция отправки на сервер запроса на получение данных о текущем пользователе
function getUserData() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(handleResponse);
}

// Функция отправки на сервер запроса на обновление данных о текущем пользователе
function sendUserData(userNameData, userAboutData) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userNameData,
      about: userAboutData
    })
  })
  .then(handleResponse);
}

// Функция отправки на сервер запроса на создание новой карточки
function postNewCard(cardNameData, cardLinkData) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardNameData,
      link: cardLinkData
    })
  })
  .then(handleResponse);
}

// Функция отправки на сервер запроса на удаление карточки
function deleteUserCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(handleResponse);
}

//Функция отправки на сервер запроса на постановку лайка
function putCardLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(handleResponse);
}

//Функция отправки на сервер запроса на снятие лайка
function deleteCardLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(handleResponse);
}

//Функция отправки на сервер запроса на обновление аватара пользователя
function sendUserAvatar(userAvatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: userAvatar
    })
  })
  .then(handleResponse);
}

export {
  getCardsData,
  getUserData,
  sendUserData,
  postNewCard,
  deleteUserCard,
  putCardLike,
  deleteCardLike,
  sendUserAvatar
};
