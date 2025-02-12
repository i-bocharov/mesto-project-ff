import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';

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
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

// Function editing a profile using the form
function handleFormSubmitEditProfile(evt) {
    evt.preventDefault();

    const dataNameInput = nameInput.value;
    const dataJobInput = jobInput.value;

    profileTitle.textContent = dataNameInput;
    profileDescription.textContent = dataJobInput;

    closeModal(popupTypeEdit);
}

// Function adding a new card via the form
function handleFormSubmitNewCard(evt) {
  evt.preventDefault();

  const placeName = placeNameInput.value;
  const placeLink = placeLinkInput.value;

  const newCard = createCard({ name: placeName, link: placeLink }, cardTemplate, { deleteCard, likeCard, handleImageClick });

  renderCard(newCard, cardList);

  evt.target.reset();

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

// Displaying cards using the forEach loop
initialCards.forEach((element) => renderCard(createCard(element, cardTemplate, { deleteCard, likeCard, handleImageClick }), cardList));

// Opening modal windows edit profile
profileEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openModal(popupTypeEdit);
});

// Opening modal window add new card
profileAddButton.addEventListener('click', () => openModal(popupTypeNewCard));

// Closing all modal windows
modalPopups.forEach(modalPopup => {
  const popupCloseButton = modalPopup.querySelector('.popup__close');

  modalPopup.classList.add('popup_is-animated');

  popupCloseButton.addEventListener('click', () => closeModal(modalPopup));

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
