// Function open modal
function openModal(element) {
  element.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscapeKey);
}

// Function close modal
function closeModal(element) {
  element.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscapeKey);

  if (element.classList.contains('popup_type_new-card')) {
    const formNewPlace = document.forms['new-place'];

    formNewPlace.reset();
  }

  if (element.classList.contains('popup_type_new-avatar')) {
    const formNewAvatar = document.forms['new-avatar'];

    formNewAvatar.reset();
  }
}

// Function for handling Escape key
function handleEscapeKey(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');

    closeModal(openedPopup);
  }
}

export { openModal, closeModal };
