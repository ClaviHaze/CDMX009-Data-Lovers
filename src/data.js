const fetchURL = 'https://raw.githubusercontent.com/ClaviHaze/CDMX009-Data-Lovers/master/src/data/pokemon/pokemon.json';

export let pokemons

export const filter = (data) => {
  const listSection = document.querySelector('#pokeList');
  for (const pokemons of data.pokemon) {
    const card = document.createElement('td');
    const pokepic = document.createElement('img');
    const idname = document.createElement('p');
    const type = document.createElement('img');
    pokepic.src = pokemons.img;
    idname.innerHTML = '#' + pokemons.id + ' ' + pokemons.name;
    listSection.appendChild(card);
    card.appendChild(pokepic);
    card.appendChild(idname);
    card.appendChild(type);
    card.setAttribute('id', pokemons.name);
    card.setAttribute('class', 'pokeBtn');
    pokepic.setAttribute('class', 'pokeImg');
    type.setAttribute('id', pokemons.type);
  }
};
export const filterTwo = (data) => {
  console.log(data.pokemon);
};
fetch(fetchURL)
  .then(response => {
    if (!response.ok) {
      throw Error ('Data Load Error');
    }
    return response.json()
  })
  .then(data => {
    filter(data)
    filterTwo(data)
    // colocamos los pokes en la v global
    pokemons=data.pokemon
  })
  .catch(error => {
    console.error(error);
  });