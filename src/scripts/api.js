function cards() {
  return fetch('https://nomoreparties.co/v1/wff-cohort-33/cards', {
    headers: {
      authorization: '3c96d569-9b34-4210-be91-2190c5f8004c'
    }
  })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
    });
}

function userInfo (profileTitle, profileDescription, profileAvatar) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-33/users/me', {
    headers: {
      authorization: '3c96d569-9b34-4210-be91-2190c5f8004c'
    }
  })
    .then(res => res.json())
    .then((result) => {
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
      profileAvatar.style.backgroundImage = "url(" + result.avatar + ")";
    })
  }

export { cards, userInfo };
