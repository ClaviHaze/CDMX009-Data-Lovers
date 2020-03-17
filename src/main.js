import icons from './icons.js';

import { pokemons, filterByType, filterByEgg, topSpawns } from './data.js';

const listSection = document.querySelector('#pokeList');
const introText = document.querySelector('#introText');
function drawPokes(list){
  listSection.textContent = '';
  for (const pokemon of list) {
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
    card.setAttribute('id', pokemon.name);
    card.setAttribute('class', 'pokeBtn');
    pokepic.setAttribute('class', 'pokeImg');
    type.setAttribute('id', pokemon.type);
  }
};
const pokeTable = document.querySelector('#pokeList');
let selected;
const tableFunction = (event) => {
  const item = event.target.closest('td');
  const chosenItem = item.id;
  introText.style.display = 'none';
  if (chosenItem == 'Dark') {
    listSection.textContent = '';
    const notice = document.createElement('h1');
    notice.setAttribute('class', 'text');
    notice.textContent = 'No hay Pokemón del tipo Siniestro en la región de Kanto :(';
    listSection.appendChild(notice);
  }
  else if (icons.eggKm.includes(chosenItem)) {
    let filtered = filterByEgg(chosenItem);
    let print = drawPokes(filtered);
  }
  else if (icons.typeName.includes(chosenItem)) {
    let filtered = filterByType(chosenItem);
    let print = drawPokes(filtered);
  }
  else {
    const highlight = (node) => {
      if (selected) {
        selected.classList.remove('highlight');
      }
      selected = node;
      selected.classList.add('highlight');
    };
    if (!item) return;
    if (!pokeTable.contains(item)) return;
    highlight(item);
  }
};

document.getElementById('pokeList').addEventListener('click', tableFunction);
document.getElementById('types').addEventListener('click', tableFunction);
document.getElementById('egg').addEventListener('click', tableFunction);

const showAll = () => {
  document.getElementById('egg').style.display = 'none';
  document.getElementById('types').style.display = 'none';
  introText.style.display = 'none';
  let print = drawPokes(pokemons);
};
document.getElementById('allPoke').addEventListener('click', showAll);

const showTopSpawns = () => {
  document.getElementById('egg').style.display = 'none';
  document.getElementById('types').style.display = 'none';
  introText.style.display = 'none';
  const pipo = topSpawns();
  let print = drawPokes(pipo);
};
document.getElementById('topSpawn').addEventListener('click', showTopSpawns);

const navTypes = document.querySelector('#types');
const navEggs = document.querySelector('#egg');
const showTypeList = () => {
  introText.style.display = 'none';
  document.getElementById('egg').style.display = 'none';
  document.getElementById('types').style.display = 'flex';
  navTypes.textContent = '';
  for (let i = 0; i < icons.types.length; i += 1) {
    const typeImg = document.createElement('img');
    const typeBtn = document.createElement('td');
    typeImg.src = icons.types[i];
    typeBtn.setAttribute('id', icons.typeName[i]);
    typeBtn.setAttribute('class', 'listBtn');
    typeBtn.appendChild(typeImg);
    navTypes.appendChild(typeBtn);
  }
};
document.getElementById('pokeType').addEventListener('click', showTypeList);

const showEggList = () => {
  introText.style.display = 'none';
  document.getElementById('egg').style.display = 'flex';
  document.getElementById('types').style.display = 'none';
  navEggs.textContent = '';
  for (let i = 0; i < icons.eggs.length; i += 1) {
    const eggBtn = document.createElement('td');
    const eggIcon = document.createElement('img');
    const eggText = document.createElement('p');
    eggBtn.appendChild(eggIcon);
    eggBtn.appendChild(eggText);
    eggIcon.src = icons.eggs[i];
    eggText.innerHTML = icons.eggKm[i];
    eggBtn.setAttribute('id', icons.eggKm[i]);
    eggBtn.setAttribute('class', 'icon');
    eggIcon.setAttribute('class', 'eggBtn');
    eggText.setAttribute('class', 'subtitle');
    navEggs.appendChild(eggBtn);
  }
};
document.getElementById('eggKm').addEventListener('click', showEggList);

const topBtn = document.querySelector('#backTop');
topBtn.addEventListener('click', top);
window.onscroll = function() {
  scroll()
};
function scroll() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topBtn.style.display = 'block';
  } else {
    topBtn.style.display = 'none';
  }
};
function top() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};
