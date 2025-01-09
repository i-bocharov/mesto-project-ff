// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


// Start Script

// Declaring variables

const cardTemplate = document.querySelector('#card-template').content;
console.log(cardTemplate)

const cardList = document.querySelector('.places__list');
console.log(cardList)

// Function create card
function createCard (element, removeCard) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__image').alt = element.alt;
  cardElement.querySelector('.card__title').textContent = element.name;

  const buttonRemoveCard = cardElement.querySelector('.card__delete-button');
  buttonRemoveCard.addEventListener('click', buttonRemoveCard);

  return cardElement;
};

// Function remove card
function removeCard (button) {
  button.closest('.places__item').remove();
};

// Function render one card
function renderCard (cardElement, cardList) {
  cardList.append(cardElement);
};

// Displaying cards using the forEach loop
initialCards.forEach(() => {
  removeCard(createCard(element, removeCard), cardList)
});
