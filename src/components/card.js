// Function create card
function createCard(element, removeCard, cardTemplate) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = element.link;
  cardImage.alt = element.alt;
  cardElement.querySelector('.card__title').textContent = element.name;

  deleteButton.addEventListener('click', () => removeCard(cardElement));

  return cardElement;
}

// Function remove card
function removeCard(item) {
  item.remove();
}

export { createCard, removeCard };
