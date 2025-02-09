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
profileEditButton.addEventListener('click', () => {
  // Получаем текущее значение имени и описания профиля
  const profileTitle = document.querySelector('.profile__title').textContent;
  const profileDescription = document.querySelector('.profile__description').textContent;

  // Устанавливаем значения в поля ввода
  nameInput.value = profileTitle;
  jobInput.value = profileDescription;

  openModal(popupTypeEdit);
});
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

// Forms

const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;

function handleFormSubmit(evt) {
    evt.preventDefault();

    const dataNameInput = nameInput.value;
    const dataJobInput = jobInput.value;

    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    profileTitle.textContent = dataNameInput;
    profileDescription.textContent = dataJobInput;
    closeModal(popupTypeEdit);
}

formEditProfile.addEventListener('submit', handleFormSubmit);
