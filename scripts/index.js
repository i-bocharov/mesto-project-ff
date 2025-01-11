// Declaring variables
const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

// Function create card
function createCard(element, removeCard) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__image').alt = element.alt;
  cardElement.querySelector('.card__title').textContent = element.name;

  deleteButton.addEventListener('click', () => removeCard(cardElement));

  return cardElement;
}

// Function remove card
function removeCard(item) {
  item.remove();
}

// Function render one card
function renderCard(cardElement, cardList) {
  cardList.append(cardElement);
}

// Displaying cards using the forEach loop
initialCards.forEach((element) => renderCard(createCard(element, removeCard), cardList));
