const textInput = document.getElementById('user-input')
const checkBtn = document.getElementById('check-btn')
const clearBtn = document.getElementById('clear-btn')
const results = document.getElementById('results-div')

function numberValidator() {
  const userInput = textInput.value
  if (userInput === '') {
    alert('Please provide a phone number')
    return
  }

  const isValidNumber = telephoneCheck(userInput)
  const paragraph = document.createElement('p')

  if (isValidNumber) {
    paragraph.classList.add('valid')
    paragraph.textContent = `Valid US number: ${userInput}`
  } else {
    paragraph.classList.add('invalid')
    paragraph.textContent = `Invalid US number: ${userInput}`
  }

  textInput.value = ''
  results.appendChild(paragraph)
}

checkBtn.addEventListener('click', numberValidator)

textInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    numberValidator()
  }
})

clearBtn.addEventListener('click', () => {
  results.innerHTML = ''
})

function telephoneCheck(str) {
  return /^1?[\s-]?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/.test(str);
}