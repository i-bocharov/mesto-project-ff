import './pages/index.css';
import { createCard, handleCardDelete, handleCardLike } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import {
  getCardsData,
  getUserData,
  sendUserData,
  postNewCard,
  deleteUserCard,
  putCardLike,
  deleteCardLike,
  sendUserAvatar
} from './scripts/api.js';

// Элементы DOM
const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileAvatarEditButton = document.querySelector('.profile__avatar-edit-icon');
const profileAvatar = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Формы
const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;

const formNewPlace  = document.forms['new-place'];
const placeNameInput = formNewPlace.elements['place-name'];
const placeLinkInput = formNewPlace.elements.link;

const formNewAvatar = document.forms['new-avatar'];
const avatarLinkInput = formNewAvatar.elements['avatar-link'];

// Модальные окна
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeNewAvatar = document.querySelector('.popup_type_new-avatar');
const popupTypeImage = document.querySelector('.popup_type_image');
const modalPopups = document.querySelectorAll('.popup');

// Конфигурация валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'form__input-error_active'
}

// Включение валидации
enableValidation(validationConfig);

// Функция для вывода информации о сохранении при нажатии на кнопку
function loadingButton(isLoading) {
  const popupButtons = document.querySelectorAll('.popup__button');

  popupButtons.forEach((popupButton) => {
    if (isLoading) {
      popupButton.textContent = 'Сохранение...'
    } else {
      popupButton.textContent = 'Сохранить'
    }
  })
}

// Функция для обработки отправки формы редактирования профиля
function handleFormSubmitEditProfile(evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    loadingButton(true);

    sendUserData(profileTitle.textContent, profileDescription.textContent)
      .then(() => {
        closeModal(popupTypeEdit);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        loadingButton(false);
      });
}

// Функция для обработки отправки формы создания новой карточки
function handleFormSubmitNewCard(evt) {
  evt.preventDefault();

  const placeName = placeNameInput.value.trim();
  const placeLink = placeLinkInput.value.trim();

  loadingButton(true);

  postNewCard(placeName, placeLink)
    .then((newCardData) => {
      const newCard = createCard(newCardData, cardTemplate, userData._id, {
        deleteCard: (cardElement, cardId) => handleCardDelete(cardElement, cardId, deleteUserCard),
        likeCard: (cardId, cardLikeButton, cardLikeCounter) => handleCardLike(cardId, cardLikeButton, cardLikeCounter, putCardLike, deleteCardLike),
        handleImageClick
      });

      renderCard(newCard, cardList);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loadingButton(false);
    });

  closeModal(popupTypeNewCard);
}

// Функция для обработки отправки формы изменения аватара
function handleFormSubmitNewAvatar(evt) {
  evt.preventDefault();
  const newAvatarUrl = avatarLinkInput.value.trim();

  loadingButton(true);

  sendUserAvatar(newAvatarUrl)
    .then((userData) => {
      profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

      closeModal(popupTypeNewAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loadingButton(false);
    });
}

// Функция для открытия модального окна просмотра изображения
function handleImageClick(imageLink, imageAlt, imageName) {
  const popupImage = popupTypeImage.querySelector('.popup__image');
  const popupCaption = popupTypeImage.querySelector('.popup__caption');

  popupImage.src = imageLink;
  popupImage.alt = imageAlt;
  popupCaption.textContent = imageName;

  openModal(popupTypeImage);
}

// Функция для рендеринга одной карточки
function renderCard(cardElement, cardList) {
  cardList.prepend(cardElement);
}

// Функция для открытия модального окна редактирования профиля
function openProfilePopup() {
  clearValidation(formEditProfile, validationConfig);

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openModal(popupTypeEdit);
}

// Функция для открытия модального окна создания новой карточки
function openNewCardPopup() {
  clearValidation(formNewPlace, validationConfig);

  openModal(popupTypeNewCard);
}

// Слушатели событий
profileEditButton.addEventListener('click', openProfilePopup);
profileAddButton.addEventListener('click', openNewCardPopup);
profileAvatarEditButton.addEventListener('click', () => {
  clearValidation(formNewAvatar, validationConfig);
  openModal(popupTypeNewAvatar);
});

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

formEditProfile.addEventListener('submit', handleFormSubmitEditProfile);
formNewPlace.addEventListener('submit', handleFormSubmitNewCard);
formNewAvatar.addEventListener('submit', handleFormSubmitNewAvatar);

// Получение данных с сервера
let userData;
Promise.all([getUserData(), getCardsData()])
  .then(([user, cards]) => {
    userData = user;
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileAvatar.style.backgroundImage = `url(${user.avatar})`;

    const sortedCards = cards.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    sortedCards.forEach((cardData) => {
      if (!cardData || !cardData.link || !cardData.name || !cardData.owner || !cardData.likes) {
        console.error('Некорректные данные карточки:', cardData);
        return; // Пропускаем карточку с некорректными данными
      }

      const cardElement = createCard(cardData, cardTemplate, user._id, {
        deleteCard: (cardElement, cardId) => handleCardDelete(cardElement, cardId, deleteUserCard),
        likeCard: (cardId, cardLikeButton, cardLikeCounter) => handleCardLike(cardId, cardLikeButton, cardLikeCounter, putCardLike, deleteCardLike),
        handleImageClick
      });
      renderCard(cardElement, cardList);
    });
  })
  .catch((err) => {
    console.log(err);
  });
