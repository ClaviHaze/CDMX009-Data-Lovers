import icons from './icons.js';

import filters from './data.js';

let print;
let selected;
const listSection = document.querySelector('#pokeList');
const introText = document.querySelector('#introText');
const navTypes = document.querySelector('#types');
const navEggs = document.querySelector('#egg');
const topBtn = document.querySelector('#backTop');
const pokeType = document.querySelector('#pokeType');
const pokeTable = document.querySelector('#pokeList');
const topSpawn = document.querySelector('#topSpawn');
const allPoke = document.querySelector('#allPoke');
const eggKm = document.querySelector('#eggKm');
const home = document.querySelector('#home');

const backHome = () => {
  listSection.textContent = '';
  introText.style.display = 'grid';
  navTypes.style.display = 'none';
  navEggs.style.display = 'none';
};
home.addEventListener('click', backHome);

const drawPokes = (list) => {
  listSection.textContent = '';
  list.forEach((pokemon) => {
    const card = document.createElement('td');
    const pokepic = document.createElement('img');
    const idname = document.createElement('p');
    pokepic.src = pokemon.img;
    idname.innerHTML = `#${pokemon.id} ${pokemon.name}`;
    listSection.appendChild(card);
    card.appendChild(pokepic);
    card.appendChild(idname);
    card.setAttribute('id', pokemon.name);
    card.setAttribute('class', 'pokeBtn');
    pokepic.setAttribute('class', 'pokeImg');
    pokemon.type.forEach((element) => {
      const type = document.createElement('img');
      type.setAttribute('id', element);
      type.setAttribute('class', 'pokeType');
      const typeSrc = icons.typeSrc.find((srcType) => srcType.name === element);
      type.src = typeSrc.imgSrc;
      card.appendChild(type);
    });
  });
  pokeTable.scrollIntoView({
    behavior: 'smooth', inline: 'end',
  });
};

const tableFunction = (event) => {
  const item = event.target.closest('td');
  if (!item) return;
  const chosenItem = item.id;
  introText.style.display = 'none';
  if (chosenItem === 'Dark') {
    listSection.textContent = '';
    const notice = document.createElement('p');
    notice.setAttribute('class', 'text');
    notice.textContent = 'No hay Pokemón del tipo Siniestro en la región de Kanto :(';
    pokeTable.scrollIntoView({
      behavior: 'smooth', inline: 'end',
    });
    listSection.appendChild(notice);
  } else if (icons.eggKm.includes(chosenItem)) {
    const filtered = filters.filterByEgg(chosenItem);
    print = drawPokes(filtered);
  } else if (icons.typeName.includes(chosenItem)) {
    const filtered = filters.filterByType(chosenItem);
    print = drawPokes(filtered);
  } else {
    const highlight = (node) => {
      if (selected) {
        selected.classList.remove('highlight');
      }
      selected = node;
      selected.classList.add('highlight');
    };
    if (!pokeTable.contains(item)) return;
    highlight(item);
  }
};
listSection.addEventListener('mouseover', tableFunction);
navTypes.addEventListener('click', tableFunction);
navEggs.addEventListener('click', tableFunction);

const showAll = () => {
  introText.style.display = 'none';
  navTypes.style.display = 'none';
  navEggs.style.display = 'none';
  listSection.textContent = '';
  const allPokemon = filters.show151();
  print = drawPokes(allPokemon);
  pokeTable.scrollIntoView({
    behavior: 'smooth', inline: 'end',
  });
};
allPoke.addEventListener('click', showAll);

const showTopSpawns = () => {
  introText.style.display = 'none';
  navTypes.style.display = 'none';
  navEggs.style.display = 'none';
  const showTopTen = filters.topSpawns();
  print = drawPokes(showTopTen);
  return print;
};
topSpawn.addEventListener('click', showTopSpawns);

const showTypeList = () => {
  introText.style.display = 'none';
  navTypes.style.display = 'flex';
  navEggs.style.display = 'none';
  navTypes.textContent = '';
  for (let i = 0; i < icons.typeName.length; i += 1) {
    const typeImg = document.createElement('img');
    const typeBtn = document.createElement('td');
    typeImg.src = icons.srcType[i];
    typeBtn.setAttribute('id', icons.typeName[i]);
    typeBtn.setAttribute('class', 'listBtn');
    typeBtn.appendChild(typeImg);
    navTypes.appendChild(typeBtn);
  }
  navTypes.scrollIntoView({
    behavior: 'smooth', inline: 'end',
  });
};
pokeType.addEventListener('click', showTypeList);

const showEggList = () => {
  introText.style.display = 'none';
  navTypes.style.display = 'none';
  navEggs.style.display = 'flex';
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
eggKm.addEventListener('click', showEggList);

const scroll = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topBtn.style.display = 'block';
  } else {
    topBtn.style.display = 'none';
  }
};
const top = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};
topBtn.addEventListener('click', top);

window.onscroll = () => {
  scroll();
};
