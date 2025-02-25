
// Function create card
function createCard(data, cardTemplate, { deleteCard, likeCard, handleImageClick }) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeCounter = cardElement.querySelector('.card__like-counter');

  cardImage.src = data.link;
  cardImage.alt = data.alt;
  cardTitle.textContent = data.name;

  deleteButton.addEventListener('click', () => deleteCard(cardElement));

  // Установка количества лайков
  cardLikeCounter.textContent = data.likes.length;

  cardLikeButton.addEventListener('click', () => {
    likeCard(cardLikeButton);

    // Увеличиваем/уменьшаем количество лайков при нажатии
    if (cardLikeButton.classList.contains('card__like-button_is-active')) {
      cardLikeCounter.textContent = parseInt(cardLikeCounter.textContent) + 1; // Увеличиваем количество
    } else {
      cardLikeCounter.textContent = parseInt(cardLikeCounter.textContent) - 1; // Уменьшаем количество
    }
  });

  cardImage.addEventListener('click', () => handleImageClick(data.link, data.alt, data.name));

  return cardElement;
}

// Function remove card
function deleteCard(element) {
  element.remove();
}

// Function like card
function likeCard(element) {
  element.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, likeCard };
