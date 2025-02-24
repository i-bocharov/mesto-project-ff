import './pages/index.css';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import { getCardsData, getUserData, sendUserData, postNewCard } from './scripts/api.js';

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
const profileAvatar = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

// Function editing a profile using the form
function handleFormSubmitEditProfile(evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    sendUserData(profileTitle.textContent, profileDescription.textContent)
      .catch((err) => {
        console.log(err);
      });

    closeModal(popupTypeEdit);
}

// Function adding a new card via the form
function handleFormSubmitNewCard(evt) {
  evt.preventDefault();

  const placeName = placeNameInput.value;
  const placeLink = placeLinkInput.value;

  const newCard = createCard({ name: placeName, link: placeLink }, cardTemplate, { deleteCard, likeCard, handleImageClick });

  renderCard(newCard, cardList);

  postNewCard(placeName, placeLink)
    .catch((err) => {
      console.log(err);
    });

  closeModal(popupTypeNewCard);
}

// Function open image modal
function handleImageClick(imageLink, imageAlt, imageName) {
  popupImage.src = imageLink;
  popupImage.alt = imageAlt;
  popupCaption.textContent = imageName;

  openModal(popupTypeImage);
}

// Function render one card
function renderCard(cardElement, cardList) {
  cardList.prepend(cardElement);
}

// Function open profile popup
function openProfilePopup() {
  clearValidation(formEditProfile, validationConfig);

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openModal(popupTypeEdit);
}

// Function open new card popup
function openNewCardPopup() {
  clearValidation(formNewPlace, validationConfig);

  openModal(popupTypeNewCard);
}

// Opening modal windows edit profile
profileEditButton.addEventListener('click', openProfilePopup);

// Opening modal window add new card
profileAddButton.addEventListener('click', openNewCardPopup);

// Closing all modal windows
modalPopups.forEach(modalPopup => {
  const popupCloseButton = modalPopup.querySelector('.popup__close');

  modalPopup.classList.add('popup_is-animated');

  popupCloseButton.addEventListener('click', () => {
    closeModal(modalPopup);
  });

  modalPopup.addEventListener('click', (event) => {
    if (event.target === modalPopup) {
      closeModal(modalPopup);
    }
  });
});

// Handle form submit edit profile
formEditProfile.addEventListener('submit', handleFormSubmitEditProfile);

// Handle form submit new card
formNewPlace.addEventListener('submit', handleFormSubmitNewCard);

// Declaring variables validationConfig
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'form__input-error_active'
}

//Calling the enableValidation function
enableValidation(validationConfig);

// API calls combined using Promise.all
Promise.all([getUserData(), getCardsData()])
  .then(([userData, cardsData]) => {
    // Updating profile information
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = "url(" + userData.avatar + ")";

    // Uploading the cards to the page
    const sortedCards = cardsData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    sortedCards.forEach((element) => {
      renderCard(createCard(element, cardTemplate, { deleteCard, likeCard, handleImageClick }), cardList);
    });
  })
  .catch((err) => {
    console.log(err);
  });
