const fetchURL = 'https://raw.githubusercontent.com/ClaviHaze/CDMX009-Data-Lovers/master/src/data/pokemon/pokemon.json';
export let pokemons;
fetch(fetchURL)
  .then(response => {
    if (!response.ok) {
      throw Error('Data Load Error');
    }
    return response.json()
  })
  .then(data => {
    pokemons = data.pokemon;
  })
  .catch(error => {
    console.error(error);
  });

export const filterByType = (type) => {
  const byType = pokemons.filter(poke => poke.type.includes(type));
  return byType;
};
export const filterByEgg = (egg) => {
  const byEgg = pokemons.filter(poke => poke.egg.includes(egg));
  return byEgg;
};
export  const topSpawns = () => {
  const spawnSort = pokemons.sort ((a, b) => ((a.spawn_chance > b.spawn_chance) ? -1 : 1));
  const spawnChance = spawnSort.slice(0, 10);
  return spawnChance;
};
