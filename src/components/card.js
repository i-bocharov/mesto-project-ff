// Function create card
function createCard(data, removeCard, cardTemplate, popupTypeImage, openImageModal) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = data.link;
  cardImage.alt = data.alt;
  cardTitle.textContent = data.name;

  cardImage.addEventListener('click', () => openImageModal(popupTypeImage, data.link, data.alt, data.name));

  deleteButton.addEventListener('click', () => removeCard(cardElement));

  cardLikeButton.addEventListener('click', () => cardLikeButton.classList.toggle('card__like-button_is-active'));

  return cardElement;
}

// Function remove card
function removeCard(item) {
  item.remove();
}

export { createCard, removeCard };
