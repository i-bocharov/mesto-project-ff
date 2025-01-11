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
function createCard (element) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  console.log(cardElement)

  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__image').alt = element.alt;
  cardElement.querySelector('.card__title').textContent = element.name;

  return cardElement;
};

// Function remove card
function removeCard () {

};

// Function render one card
function renderCard (cardElement, cardList) {
  cardList.append(cardElement);
};

// Displaying cards using the forEach loop
initialCards.forEach((element) => {
  renderCard(createCard(element), cardList)
});
