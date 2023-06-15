if(window.innerWidth <= 1199) {
  document.querySelectorAll('.arrow').forEach(el => {
    el.classList.remove('service-arrow');
  })
}

window.addEventListener('resize', function() {
  if(window.innerWidth >= 1200) {
    document.querySelectorAll('.arrow').forEach(el => {
      el.classList.add('service-arrow');
    })
  } else {
    document.querySelectorAll('.arrow').forEach(el => {
      el.classList.remove('service-arrow');
    })
  }
})


const textWrapper = document.querySelector('.hero__description .letters');

if(textWrapper) {
  textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

  anime.timeline({loop: true})
    .add({
      targets: '.hero__description .letter',
      rotateY: [-90, 0],
      duration: 700,
      delay: (el, i) => 20 * i
    }).add({
      targets: '.hero__description',
      opacity: 0,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 1000
    });
}


// Функция получения курса криптовалюты
function getPriceOfСryptourrency(coin, currencys) {
  const url = `https://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=${currencys}&api_key={aafc206b5bbcbdfa0c86fb4ee8c5f3294f5adc07bc3899794b1941f6c772f591}`

  return fetch(url).then(response => {
    return response.json();
  })
}


// Функция показа полученного курса
function showCoin() {
  const coinEl = document.querySelector('.coin');

  getPriceOfСryptourrency('BTC', ['USD', 'EUR'])
  .then(data => {
    coinEl.textContent = `BTC - ${data.USD}$`;
  })
  .catch(error => { 
    coinEl.textContent = '';
  });
}

showCoin();