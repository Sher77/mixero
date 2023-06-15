
// Add another input - mix.html

function addBitcoinAddress() {
  const addressBtn = document.querySelector('.mix-form__btn-address');
  const inputList = document.querySelector('.mix-form__list');

  let currentPercent = 100;
  let maxInputs = 5;
  let inputCounter = 1;
  let inputPercentId = 0;

  addressBtn.addEventListener('click', e => {
    e.preventDefault();
    inputCounter++;
    inputPercentId++;

    if(inputCounter <= maxInputs) {
      const li = document.createElement('li');
      li.className = 'mix-form__item';
      
      const input = document.createElement('input');
      input.className = 'mix-form__input';
      input.setAttribute('name', 'bitcoin-address');
      input.setAttribute('type', 'text');
      input.required = true;

      const wrap = document.createElement('div');
      wrap.className = 'mix-form__item-inner';

      const label = document.createElement('label');
      label.className = 'mix-form__percent-wrap';
      
      const inputPercent = document.createElement('input');
      inputPercent.className = 'mix-form__percent';
      inputPercent.setAttribute('type', 'number');
      inputPercent.min = 1;
      inputPercent.step = 0.1;
      inputPercent.max = 100;
      inputPercent.disabled = true;
      inputPercent.id = inputPercentId;
      
      inputPercent.value = Math.floor(currentPercent / inputCounter) + '.00';

      document.querySelectorAll('#coinjoin .mix-form__percent').forEach(input => {
        input.value = Math.floor(currentPercent / inputCounter) + '.00';
      });
      
      const div = document.createElement('div');
      div.className = 'mix-form__btns';
      
      const error = document.createElement('div');
      error.className = 'mix-form__percent-error visually-hidden';
      error.textContent = 'Exceeded from 100%';
    
      const btnCancel = document.createElement('button');
      btnCancel.setAttribute('type', 'button');
      btnCancel.className = 'mix-form__btn mix-form__btn--cancel';
    
      const btnEdit = document.createElement('button');
      btnEdit.setAttribute('type', 'button');
      btnEdit.className = 'mix-form__btn mix-form__btn--edit';
    
    
      li.append(wrap);
      li.append(error);
      wrap.append(input);
      wrap.append(label);
      label.append(inputPercent);
      wrap.append(div);
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
        inputPercentId = 0;
        document.querySelectorAll('#coinjoin .mix-form__percent').forEach(input => {
          input.value = Math.floor(currentPercent / inputCounter) + '.00';
          input.id = inputPercentId++;
        });
      });

      btnEdit.addEventListener('click', e => {
        const target = e.currentTarget;
        const parent = target.closest('.mix-form__item-inner');
        const input = parent.querySelector('.mix-form__percent');

        if(input.disabled) {
          input.disabled = false;
        } else {
          input.disabled = true;
        }
      });

      inputPercent.addEventListener('change', e => {
        const target = e.currentTarget;
        const value = +target.value;
        
        if(value < 0 || value > 100) {
          target.closest('.mix-form__item').querySelector('.mix-form__percent-error').classList.remove('visually-hidden');
        } else {
          target.closest('.mix-form__item').querySelector('.mix-form__percent-error').classList.add('visually-hidden');

          let index = +target.id;
          let newValue = +target.value;
          let inputs = document.querySelectorAll('input.mix-form__percent');
          let inputArr = [];

          for(let i = 0; i < inputs.length; i++) {
            inputArr.push(+inputs[i].value)
          }

          const finalValues = redistributeValues(inputArr, index, newValue);

          inputs.forEach((input, index) => {
            input.value = finalValues[index].toFixed(2);
          })
        }
      });

      document.querySelectorAll('input.mix-form__input').forEach(validateInput);
    }
  });
}
  
addBitcoinAddress();

const mixFormInputs = document.querySelectorAll('input.mix-form__input');


function validateInput() {
  const mixFormInputs = document.querySelectorAll('input.mix-form__input');

  mixFormInputs.forEach(input => {
    input.addEventListener('input', e => {
      const inputValue = input.value;
    
      const pattern = /^[A-Za-z0-9]{28,36}$/;
    
      if(pattern.test(inputValue)) {
        input.classList.remove('error');
      } else {
        input.classList.add('error');
      }
    });
  })
}

validateInput();


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
  const calculatorInputs = document.querySelectorAll('.calculator .calculator__input');

  calculatorBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      const calculatorContent = e.currentTarget.parentElement.nextElementSibling;
      calculatorContent.classList.toggle('open');
    });
  });

  calculatorInputs.forEach(input => {
    input.addEventListener('input', e => {
      const target = e.currentTarget;
      const receiveInput = target.parentElement.nextElementSibling.querySelector('.calculator__input-receive');
      const bitcoin = target.value;
      const percent = 2;
      const commission = bitcoin * (percent / 100);

      console.log(receiveInput);
      const pattern = /^\d+$/;

      if(pattern.test(bitcoin)) {
        receiveInput.classList.remove('error');
        receiveInput.value = `~${(bitcoin - commission).toFixed(8)} BTC`;
      } else {
        receiveInput.classList.add('error');
        receiveInput.value = 'Invalid Amount';
      }
    });
  });
}

showCalculator();

function redistributeValues(inputs, index, newValue) {
  if (index < 0 || index >= inputs.length || newValue < 0 || newValue > 100) {
    console.error('Invalid index or new value');
    return;
  }

  let sum = 100 - newValue;

  let currentSum = 0;
  for (let i = 0; i < inputs.length; i++) {
    if (i !== index) {
      currentSum += inputs[i];
    }
  }

  let coefficient = sum / currentSum;
  
  for (let i = 0; i < inputs.length; i++) {
    if (i !== index) {
      inputs[i] *= coefficient;
    }
  }

  inputs[index] = newValue;

  return inputs;
}
