const copyBtn = document.querySelector('.coinjoin__copy');


copyBtn.addEventListener('click', e => {
  const copyText = document.querySelector('input.coinjoin__input').value;

  navigator.clipboard.writeText(copyText)
    .then(() => {
        alert('Bitcoin address copied !');
      })
      .catch(err => {
        alert('Something went wrong! Try again!');
    });
});