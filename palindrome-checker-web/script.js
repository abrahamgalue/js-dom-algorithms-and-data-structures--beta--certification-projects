const textInput = document.getElementById('text-input');
const checkBtn = document.getElementById('check-btn');
const result = document.getElementById('result');

checkBtn.addEventListener('click', () => {
  checkForPalindrome(textInput.value);
})

textInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    checkForPalindrome(textInput.value);
  }
})

const checkForPalindrome = (input) => {
  const userInput = input;
  const checkUserInput = isPalindrome(userInput);
  const truePalindromeHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-check-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" stroke-width="0" fill="currentColor" /></svg>
        <p>
          ${userInput} is a palindrome
        </p>`;
  const falsePalindromeHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-6.489 5.8a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" stroke-width="0" fill="currentColor" /></svg>
        <p>
          ${userInput} is not a palindrome
        </p>`;

  if (userInput === '') {
    result.classList.remove('is-palindrome', 'is-not-palindrome')
    result.innerHTML = ''
    alert('Please input a value')
    return
  }

  if (checkUserInput) {
    result.classList.remove('is-not-palindrome')
    result.classList.add('is-palindrome')
    result.innerHTML = truePalindromeHTML;
  } else {
    result.classList.remove('is-palindrome')
    result.classList.add('is-not-palindrome')
    result.innerHTML = falsePalindromeHTML;
  }
}

const isPalindrome = (str) => {
  str = str.replace(/[^A-Za-z0-9]/gi, '')
  const lowered = str.toLowerCase()
  const splitted = lowered.split('')
  const reversed = splitted.reverse()
  const joined = reversed.join('')
  return lowered == joined
}