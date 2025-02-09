// Function open modal
function openModal(event) {
  event.classList.add('popup_is-opened');
}

// Function open image modal
function openImageModal(popupTypeImage, imageLink, imageAlt, imageName) {
  const popupImage = popupTypeImage.querySelector('.popup__image');
  const popupCaption = popupTypeImage.querySelector('.popup__caption');

  popupImage.src = imageLink;
  popupImage.alt = imageAlt;
  popupCaption.textContent = imageName;

  openModal(popupTypeImage);
}

// Function close modal
function closeModal(event) {
  event.classList.remove('popup_is-opened');
}

export { openModal, closeModal, openImageModal };
