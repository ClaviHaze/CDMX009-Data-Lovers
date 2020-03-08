//AQUÍ VAN LAS FUNCIONES DE FILTRADO
//  import data from './data/pokemon/pokemon.js';

const listSection = document.querySelector('#pokeList');
fetch('https://raw.githubusercontent.com/ClaviHaze/CDMX009-Data-Lovers/master/src/data/pokemon/pokemon.json')
  .then(response => response.json())
  .then(data => {
    for (const pokemon of data.pokemon) {
        const card = document.createElement('td');
        const pokepic = document.createElement('img');
        const idname = document.createElement('p');
        const type = document.createElement('img');
        pokepic.src = pokemon.img;
        idname.innerHTML = '#' + pokemon.id + ' ' + pokemon.name;
        listSection.appendChild(card);
        card.appendChild(pokepic);
        card.appendChild(idname);
        card.appendChild(type);
        card.setAttribute("id", pokemon.name);
        card.setAttribute("class", "pokeBtn");
        pokepic.setAttribute("class", "pokeImg");
        type.setAttribute("id", pokemon.type);
    }
  });

  export const example = () => {
    return 'example';
  };
