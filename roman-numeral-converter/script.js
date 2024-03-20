const inputUser = document.getElementById('number');
const convertBtn = document.getElementById('convert-btn');
const output = document.getElementById('output');

const msg = {
  emptyInput: 'Please enter a valid number.',
  outOfBounds: 'Please enter a number less than or equal to 3999.',
  negativeNumber: 'Please enter a number greater than or equal to 1.'
}

const romanNumerals = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
};

const updateFailureHTML = (failureType) => {
  output.classList.remove('success')
  output.classList.add('failure')
  output.textContent = failureType
}

const updateSuccessHTML = (number) => {
  output.classList.remove('failure')
  output.classList.add('success')
  output.textContent = number
}

const updateHTML = (input) => {
  const inputUserValue = input

  if (!inputUserValue) {
    updateFailureHTML(msg.emptyInput)
  } else if (inputUserValue <= 0) {
    updateFailureHTML(msg.negativeNumber)
  } else if (inputUserValue >= 4000) {
    updateFailureHTML(msg.outOfBounds)
  } else {
    const romanNumber = convertToRoman(inputUserValue)
    updateSuccessHTML(romanNumber)
  }
}

convertBtn.addEventListener('click', () => {
  updateHTML(inputUser.value)
})

inputUser.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    updateHTML(inputUser.value)
  }
})

// check valid number
function isValidNumber(str) {
  const numberInput = Number(str);
  const isValid = Boolean(numberInput)
  return isValid;
}

// convert to roman number
function convertToRoman(num) {
  let result = "";
  const notInvalidNum = isValidNumber(num);

  if (notInvalidNum) {
    for (let key in romanNumerals) {
      while (num >= romanNumerals[key]) {
        result += key;
        num -= romanNumerals[key];
      }
    }

    return result;
  }
}