const POKE_API = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/'

const pageTitle = document.getElementById('title')
const mainContainer = document.getElementsByClassName('container')[0]
const searchForm = document.getElementById('search-form')
const inputUser = document.getElementById('search-input')
const pokemonName = document.getElementById('pokemon-name')
const pokemonId = document.getElementById('pokemon-id')
const pokemonWeight = document.getElementById('weight')
const pokemonHeight = document.getElementById('height')
const imageContainer = document.getElementById('sprite-container')
const typesContainer = document.getElementById('types')
const pokemonHp = document.getElementById('hp')
const pokemonAttack = document.getElementById('attack')
const pokemonDefense = document.getElementById('defense')
const pokemonSA = document.getElementById('special-attack')
const pokemonSD = document.getElementById('special-defense')
const pokemonSpeed = document.getElementById('speed')


const fetchPokemonData = async () => {
  try {
    const userInput = formatInputValue(inputUser.value)
    const res = await fetch(`${POKE_API}${userInput}`)
    const data = await res.json()

    // Set Pokemon Info
    pokemonName.textContent = data.name
    pokemonId.textContent = `#${data.id}`
    pokemonWeight.textContent = `Weight: ${data.weight}`
    pokemonHeight.textContent = `Height: ${data.height}`
    imageContainer.innerHTML = `<img id='sprite' src='${data.sprites.front_default}' alt='${data.name} front default sprite' />`

    // Set types
    typesContainer.innerHTML = data.types.map(obj => {
      return `<span class="type ${obj.type.name}">${obj.type.name}</span>`
    }).join('')

    // Set color text
    pageTitle.className = `${data.types[0].type.name}`
    mainContainer.className = `container ${data.types[0].type.name}`

    // Set Specific information
    pokemonHp.textContent = data.stats[0].base_stat
    pokemonAttack.textContent = data.stats[1].base_stat
    pokemonDefense.textContent = data.stats[2].base_stat
    pokemonSA.textContent = data.stats[3].base_stat
    pokemonSD.textContent = data.stats[4].base_stat
    pokemonSpeed.textContent = data.stats[5].base_stat

  } catch (e) {
    resetUI()
    alert('Pokémon not found')
    console.error(`Pokémon not found ${e}`)
  }
}

const resetUI = () => {
  const sprite = document.getElementById('sprite')
  if (sprite) sprite.remove()

  // Reset stats
  pokemonName.textContent = ''
  pokemonId.textContent = ''
  pokemonWeight.textContent = ''
  pokemonHeight.textContent = ''
  imageContainer.innerHTML = ''

  // Reset types
  typesContainer.innerHTML = ''

  // Reset color text
  pageTitle.className = ''
  mainContainer.className = 'container'

  // Reset Specific information
  pokemonHp.textContent = ''
  pokemonAttack.textContent = ''
  pokemonDefense.textContent = ''
  pokemonSA.textContent = ''
  pokemonSD.textContent = ''
  pokemonSpeed.textContent = ''
}

const formatInputValue = (str) => {
  return str.toLowerCase().split(' ').join('-')
}

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  fetchPokemonData()
})