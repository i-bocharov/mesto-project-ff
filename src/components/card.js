// Функция для создания карточки
function createCard(data, cardTemplate, userId, { deleteCard, likeCard, handleImageClick }) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardLikeCounter = cardElement.querySelector('.card__like-counter');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  // Заполнение данных карточки
  cardImage.src = data.link;
  cardImage.alt = data.alt;
  cardTitle.textContent = data.name;
  cardLikeCounter.textContent = data.likes.length;

  // Проверка, является ли текущий пользователь создателем карточки
  if (data.owner._id !== userId) {
    cardDeleteButton.classList.add('card__delete-button_hidden');
  } else {
    cardDeleteButton.classList.remove('card__delete-button_hidden');
  }

  // Проверка, поставлен ли лайк текущим пользователем
  const isLiked = data.likes.some(like => like._id === userId); // Проверяем наличие userId в массиве likes
  if (isLiked) {
    cardLikeButton.classList.add('card__like-button_is-active'); // Добавляем класс, если лайк стоит
  }

  // Добавление обработчиков событий
  cardImage.addEventListener('click', () => handleImageClick(data.link, data.alt, data.name));
  cardLikeButton.addEventListener('click', () => likeCard(cardElement, data._id, userId));
  cardDeleteButton.addEventListener('click', () => deleteCard(cardElement, data._id));

  return cardElement;
}

// Функция для обработки удаления карточки
function handleCardDelete(cardElement, cardId, deleteUserCard) {
  deleteUserCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

// Функция для обработки лайков
function handleCardLike(cardElement, cardId, userId, putCardLike, deleteCardLike) {
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardLikeCounter = cardElement.querySelector('.card__like-counter');

  if (cardLikeButton.classList.contains('card__like-button_is-active')) {
    // Если лайк уже стоит — удаляем его
    deleteCardLike(cardId)
      .then((updatedCardData) => {
        cardLikeButton.classList.remove('card__like-button_is-active');
        cardLikeCounter.textContent = updatedCardData.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    // Если лайка нет — ставим его
    putCardLike(cardId)
      .then((updatedCardData) => {
        cardLikeButton.classList.add('card__like-button_is-active');
        cardLikeCounter.textContent = updatedCardData.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
// Function remove card
function deleteCard(element) {
  element.remove();
}

// Function like card
function likeCard(element) {
  element.classList.toggle('card__like-button_is-active');
}

export { createCard, handleCardDelete, handleCardLike };
