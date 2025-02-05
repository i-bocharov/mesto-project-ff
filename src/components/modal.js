// Function open modal
function openModal(event) {
  event.classList.add('popup_is-opened');
}

function closeModal(event) {
  event.classList.remove('popup_is-opened');
}

export { openModal, closeModal };
