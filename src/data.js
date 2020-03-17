const fetchURL = 'https://raw.githubusercontent.com/ClaviHaze/CDMX009-Data-Lovers/master/src/data/pokemon/pokemon.json';

export let pokemons

export const filterByType = (type) => {
  let byType = pokemons.filter(poke => poke.type.includes(type));
  return byType;
}

export const filterByEgg = (egg) => {
  let byEgg = pokemons.filter(poke => poke.egg.includes(egg));
  return byEgg;
}

fetch(fetchURL)
  .then(response => {
    if (!response.ok) {
      throw Error ('Data Load Error');
    }
    return response.json()
  })
  .then(data => {
    pokemons = data.pokemon;
  })
  .catch(error => {
    console.error(error);
  });
