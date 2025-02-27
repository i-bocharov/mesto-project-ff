// Функция для открытия модального окна
function openModal(element) {
  element.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscapeKey);
}

// Функция для закрытия модального окна
function closeModal(element) {
  element.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscapeKey);
}

// Функция для обработки нажатия клавиши Escape
function handleEscapeKey(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');

    closeModal(openedPopup);
  }
}

export { openModal, closeModal };
