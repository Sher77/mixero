
// Add another input - mix.html

function addBitcoinAddress() {
  const addressBtn = document.querySelector('.mix-form__btn-address');
  const inputList = document.querySelector('.mix-form__list');

  let currentPercent = 100;
  let maxInputs = 5;
  let inputCounter = 1;

  addressBtn.addEventListener('click', e => {
    e.preventDefault();
    inputCounter++;

    if(inputCounter <= maxInputs) {
      const li = document.createElement('li');
      li.className = 'mix-form__item';
      
      const input = document.createElement('input');
      input.className = 'mix-form__input';
      input.setAttribute('name', 'bitcoin-address');
      input.setAttribute('type', 'number');
      
      const span = document.createElement('span');
      span.className = 'mix-form__percent';
      span.textContent = Math.floor(currentPercent / inputCounter) + '.00%';

      document.querySelectorAll('.mix-form__percent').forEach(span => {
        span.textContent = Math.floor(currentPercent / inputCounter) + '.00%';
      });
      
      const div = document.createElement('div');
      div.className = 'mix-form__btns';
    
      const btnCancel = document.createElement('button');
      btnCancel.setAttribute('type', 'button');
      btnCancel.className = 'mix-form__btn mix-form__btn--cancel';
    
      const btnEdit = document.createElement('button');
      btnEdit.setAttribute('type', 'button');
      btnEdit.className = 'mix-form__btn mix-form__btn--edit';
    
    
      li.append(input);
      li.append(span);
      li.append(div);
      div.append(btnCancel);
      div.append(btnEdit);
      inputList.append(li);

      if(inputCounter == maxInputs) {
        addressBtn.classList.add('visually-hidden');
      }

      btnCancel.addEventListener('click', e => {
        inputCounter--;
        addressBtn.classList.remove('visually-hidden');
        e.currentTarget.closest('.mix-form__item').remove();
        document.querySelectorAll('.mix-form__percent').forEach(span => {
          span.textContent = Math.floor(currentPercent / inputCounter) + '.00%';
        });
      });
    }
  });
}
  
addBitcoinAddress();

function changeRangeCategory() {
  const rangeInput = document.querySelector('.mix-form__range');
  const rangeInputValue = document.querySelector('.mix-form__value');
  const rangeInputSpeed = document.querySelector('.mix-form__speed');

  rangeInput.addEventListener('change', e => {
    let value = +e.currentTarget.value;

    rangeInputValue.textContent = `${value.toFixed(2)} %`
    
    if(value < 1600) {
      rangeInputSpeed.className = 'mix-form__speed mix-form__speed--slow';
      rangeInputSpeed.textContent = 'Slowest';
    } else if(value >= 1600 && value < 3200) {
      rangeInputSpeed.className = 'mix-form__speed mix-form__speed--fast';
      rangeInputSpeed.textContent = 'Faster';
    } else {
      rangeInputSpeed.className = 'mix-form__speed mix-form__speed--fastest';
      rangeInputSpeed.textContent = 'Fastest';
    }
  });
}

changeRangeCategory();

function showCalculator() {
  const calculatorBtns = document.querySelectorAll('.mix-form__btn-calculator');

  calculatorBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      const calculatorContent = e.currentTarget.parentElement.nextElementSibling;
      calculatorContent.classList.toggle('open');
    });
  });
}

showCalculator();