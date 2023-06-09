if(window.innerWidth <= 1999) {
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