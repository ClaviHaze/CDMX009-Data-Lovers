//AQUÍ VA LA MANIPULACIÓN DEL DOM
import icons from './icons.js'
import {example} from './data.js'

let selected;
const navTypes = document.querySelector('#types');
const navEggs = document.querySelector('#egg');
const listSection = document.querySelector('#pokeList');
const table = document.querySelector('#pokeList');

let showAll = () => {
  document.getElementById('egg').style.display = 'none';
  document.getElementById('types').style.display = 'none';
/*  for (const pokemon of data.pokemon) {
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
  }*/
}
document.getElementById('allPoke').addEventListener('click', showAll);

let tableFunction = (event) => {
  let item = event.target.closest('td');
  let chosenPoke = item.id;
  console.log(chosenPoke);
  if (!item) return;
  if (!table.contains(item)) return;
  highlight(item);
};
let highlight = (node) => {
  if (selected) {
    selected.classList.remove('highlight');
  }
  selected = node;
  selected.classList.add('highlight');
}

let showTopSpawns = () => {
  document.getElementById('egg').style.display = 'none';
  document.getElementById('types').style.display = 'none';
}
document.getElementById('topSpawn').addEventListener('click', showTopSpawns);

let showTypeList = () => {
  document.getElementById('egg').style.display = 'none';
  document.getElementById('types').style.display = 'flex';
  navTypes.textContent = '';
  for (let i=0; i < icons.types.length; i++) {
    const typeIcon = document.createElement('img');
    typeIcon.src = icons.types[i];
    typeIcon.setAttribute('id', icons.typeName[i]);
    typeIcon.setAttribute('class', 'listBtn');
    navTypes.appendChild(typeIcon);
  }
}
document.getElementById('pokeType').addEventListener('click', showTypeList);

let showEggList = () => {
  document.getElementById('egg').style.display = 'flex';
  document.getElementById('types').style.display = 'none';
  navEggs.textContent = '';
  for (let i=0; i < icons.eggs.length; i++) {
    const eggBtn = document.createElement('a');
    const eggIcon = document.createElement('img');
    const eggText = document.createElement('p');
    eggBtn.appendChild(eggIcon);
    eggBtn.appendChild(eggText);
    eggIcon.src = icons.eggs[i];
    eggText.innerHTML = icons.eggKm[i] + ' Kilometros';
    eggBtn.setAttribute('id', icons.eggKm[i]);
    eggBtn.setAttribute('class', 'icon');
    eggIcon.setAttribute('class', 'eggBtn');
    eggText.setAttribute('class', 'subtitle');
    navEggs.appendChild(eggBtn);
  }
}
document.getElementById('eggKm').addEventListener('click', showEggList);

document.getElementById('pokeList').addEventListener('click', tableFunction);
let restart = () => {
  document.getElementById('egg').style.display = 'none';
  document.getElementById('types').style.display = 'none';
}
document.getElementById('home').addEventListener('click', restart);
