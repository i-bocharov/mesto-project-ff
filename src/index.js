import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, removeCard } from './components/card.js';

// Declaring variables
const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddProfile = document.querySelector('.profile__add-button');

// Function render one card
function renderCard(cardElement, cardList) {
  cardList.append(cardElement);
}

// Displaying cards using the forEach loop
initialCards.forEach((element) => renderCard(createCard(element, removeCard, cardTemplate), cardList));


buttonEditProfile.addEventListener('click', function(event) {

});

buttonAddProfile.addEventListener('click', function(event) {

});
