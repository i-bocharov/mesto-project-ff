import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, removeCard } from './components/card.js';
import { openModal, closeModal, openImageModal } from './components/modal.js';

// Declaring variables
const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const modalPopups = document.querySelectorAll('.popup');

// Function render one card
function renderCard(cardElement, cardList) {
  cardList.append(cardElement);
}

// Displaying cards using the forEach loop
initialCards.forEach((element) => renderCard(createCard(element, removeCard, cardTemplate, popupTypeImage, openImageModal), cardList));

// Opening modal windows
profileEditButton.addEventListener('click', () => openModal(popupTypeEdit));
profileAddButton.addEventListener('click', () => openModal(popupTypeNewCard));

// Closing modal windows
modalPopups.forEach(modalPopup => {
  const popupCloseButton = modalPopup.querySelector('.popup__close');

  popupCloseButton.addEventListener('click', () => closeModal(modalPopup));

  modalPopup.addEventListener('click', (event) => {
    if (event.target === modalPopup) {
      closeModal(modalPopup);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal(modalPopup);
    }
  });
});
