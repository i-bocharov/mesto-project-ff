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
const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const formNewPlace  = document.forms['new-place'];
const placeNameInput = formNewPlace.elements['place-name'];
const placeLinkInput = formNewPlace.elements.link;

// Function render one card
function renderCard(cardElement, cardList) {
  cardList.prepend(cardElement);
}

// Displaying cards using the forEach loop
initialCards.forEach((element) => renderCard(createCard(element, removeCard, cardTemplate, popupTypeImage, openImageModal), cardList));

// Opening modal windows
profileEditButton.addEventListener('click', () => {
  const profileTitle = document.querySelector('.profile__title').textContent;
  const profileDescription = document.querySelector('.profile__description').textContent;

  nameInput.value = profileTitle;
  jobInput.value = profileDescription;

  openModal(popupTypeEdit);
});

profileAddButton.addEventListener('click', () => openModal(popupTypeNewCard));

// Closing modal windows
modalPopups.forEach(modalPopup => {
  const popupCloseButton = modalPopup.querySelector('.popup__close');

  modalPopup.classList.add('popup_is-animated');

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

// Function editing a profile using the form
function hundleFormSubmitEditProfile(evt) {
    evt.preventDefault();

    const dataNameInput = nameInput.value;
    const dataJobInput = jobInput.value;

    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    profileTitle.textContent = dataNameInput;
    profileDescription.textContent = dataJobInput;
    closeModal(popupTypeEdit);
}

formEditProfile.addEventListener('submit', hundleFormSubmitEditProfile);

// Function adding a new card via the form
function hundleFormSubmitNewCard(evt) {
  evt.preventDefault();

  const placeName = placeNameInput.value;
  const placeLink = placeLinkInput.value;

  const newCard = createCard({ name: placeName, link: placeLink }, removeCard, cardTemplate, popupTypeImage, openImageModal);

  renderCard(newCard, cardList);

  placeNameInput.value = '';
  placeLinkInput.value = '';

  closeModal(popupTypeNewCard);
}

formNewPlace.addEventListener('submit', hundleFormSubmitNewCard);
