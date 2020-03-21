const fetchURL = 'https://raw.githubusercontent.com/ClaviHaze/CDMX009-Data-Lovers/master/src/data/pokemon/pokemon.json';
let pokemons;

fetch(fetchURL)
  .then((response) => {
    if (!response.ok) {
      throw Error('Data Load Error');
    }
    return response.json();
  })
  .then((data) => {
    pokemons = data.pokemon;
  })
  .catch((error) => {
    throw error('¡Error!');
  });

const filters = {
  filterByType: (type) => {
    const byType = pokemons.filter((poke) => poke.type.includes(type));
    return byType;
  },
  filterByEgg: (egg) => {
    const byEgg = pokemons.filter((poke) => poke.egg.includes(egg));
    return byEgg;
  },
  topSpawns: () => {
    const clonePokemons = JSON.parse(JSON.stringify(pokemons));
    const spawnSort = clonePokemons.sort((a, b) => ((a.spawn_chance > b.spawn_chance) ? -1 : 1));
    const spawnChance = spawnSort.slice(0, 10);
    return spawnChance;
  },
  show151: () => {
    const pokeObject = pokemons;
    return pokeObject;
  },
};

export default filters;
