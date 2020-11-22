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
  unfiltered: () => {
    const pokeObject = pokemons;
    return pokeObject;
  },
  eeveelutionCard: `
  <tr class="container eeveelution">
    <a class="evoName">
      <img src="https://www.serebii.net/pokemongo/pokemon/133.png" class="evoPic">
      <p class="eeveelutionEevee">Eevee</p>
    </a>
    <a class="candyCount">
      <img src="images/candy.svg" class="candy">
      <small>25</small>
    </a>
    <p class="eeveelutionInfo">Eevee evoluciona aleatoriamente pero se puede elegir <u>UNA VEZ</u> su evolución al cambiar su nombre a los siguientes:</p>
    <div class="container">
      <a class="evoName">
        <img src="images/Tag-Rainer.svg">
        <img class="evoPic" src="https://www.serebii.net/pokemongo/pokemon/134.png">
        <p>Vaporeon</p>
      </a>
      <a class="evoName">
        <img src="images/Tag-Sparky.svg">
        <img class="evoPic" src="https://www.serebii.net/pokemongo/pokemon/135.png">
        <p>Jolteon</p>
      </a>
      <a class="evoName">
        <img src="images/Tag-Pyro.svg">
        <img class="evoPic" src="https://www.serebii.net/pokemongo/pokemon/136.png">
      <p>Flareon</p>
      </a>
    </div>
  `,
};

export default filters;
