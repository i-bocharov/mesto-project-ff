import { handleEscapeKey } from '../index.js';

// Function open modal
function openModal(element) {
  element.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscapeKey);
}

// Function close modal
function closeModal(element) {
  element.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscapeKey);
}

export { openModal, closeModal };
