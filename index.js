const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const characterResult = document.getElementById('characterResult');
let pokemonLibrary = []; // variable biblioteca


searchButton.addEventListener('click', () => {
  const searchText = searchInput.value.trim().toLowerCase();

  if (searchText.length > 0) {
    searchCharacter(searchText);
  } else {
    clearCharacterResult();
  }
});

function fetchPokemonLibrary() {
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1000';

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      pokemonLibrary = data.results;
    })
    .catch(error => console.log(error));
}

function searchCharacter(searchText) {
  const character = pokemonLibrary.find(pokemon => pokemon.name === searchText);

  if (character) {
    fetchCharacterDetails(character.url);
  } else {
    displayCharacterNotFound();
  }
}

function fetchCharacterDetails(url) {
  fetch(url)
    .then(response => response.json())
    .then(character => {
      displayCharacter(character);
    })
    .catch(error => console.log(error));
}

function clearCharacterResult() {
  characterResult.innerHTML = '';
}

function displayCharacter(character) {
  characterResult.innerHTML = '';
  
  const characterName = document.createElement('h2');
  characterName.textContent = character.name;

  const characterImage = document.createElement('img');
  characterImage.src = character.sprites.front_default;
  characterImage.style.width = '600px';
  characterImage.style.height = '600px';

  characterResult.appendChild(characterName);
  characterResult.appendChild(characterImage);
}

function displayCharacterNotFound() {
  characterResult.innerHTML = '<p>Ingresa un personaje valido :) </p>';

}
fetchPokemonLibrary();


