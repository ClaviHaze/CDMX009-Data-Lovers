import icons from './icons.js';

import filters from './data.js';

let print;
let selected;
let picName;
let types;
let evolution;
const listSection = document.querySelector('#pokeList');
const introText = document.querySelector('#introText');
const navTypes = document.querySelector('#types');
const navEggs = document.querySelector('#egg');
const topBtn = document.querySelector('#backTop');
const pokeType = document.querySelector('#pokeType');
const detailCard = document.querySelector('#pokeCard');
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

const drawPicName = (content, container) => {
  const pokepic = document.createElement('img');
  const idname = document.createElement('p');
  pokepic.src = content.img;
  pokepic.setAttribute('class', 'pokeImg');
  idname.innerHTML = `#${content.id} ${content.name}`;
  container.appendChild(pokepic);
  container.appendChild(idname);
}

const drawType = (content, container) => {
  content.forEach((element) => {
    const type = document.createElement('img');
    type.setAttribute('id', element);
    type.setAttribute('class', 'pokeType');
    const typeSrc = icons.typeSrc.find((srcType) => srcType.name === element);
    type.src = typeSrc.imgSrc;
    container.appendChild(type);
  });
};

const drawEvol = (content, container) => {
  if(content.length === 1) {
    const pokeEvol = document.createElement('p');
    pokeEvol.innerHTML = content[0].name;
    container.appendChild(pokeEvol);
  } 
  else {
    const pokeEvol1 = document.createElement('p');
    const pokeEvol2 = document.createElement('p');
    const candy = document.createElement('img');
    pokeEvol1.innerHTML = content[0].name;
    pokeEvol2.innerHTML = content[1].name;
    candy.src = 'images/candy.svg';
    container.appendChild(pokeEvol1);
    container.appendChild(candy);
    container.appendChild(pokeEvol2);
  };
};

const drawPokeList = (list) => {
  listSection.textContent = '';
  list.forEach((pokemon) => {
    const card = document.createElement('td');
    listSection.appendChild(card);
    card.setAttribute('id', pokemon.name);
    card.setAttribute('class', 'pokeBtn');
    picName = drawPicName(pokemon, card);
    types = drawType(pokemon.type, card);
    return picName, types;
  });
  pokeTable.scrollIntoView({
    behavior: 'smooth', inline: 'end',
  });
};

const pokeList = (event) => {
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
    print = drawPokeList(filtered);
  } else if (icons.typeName.includes(chosenItem)) {
    const filtered = filters.filterByType(chosenItem);
    print = drawPokeList(filtered);
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
listSection.addEventListener('click', pokeList);
navTypes.addEventListener('click', pokeList);
navEggs.addEventListener('click', pokeList);

const pokeCards = (event) => { 
  const item = event.target.closest('td');
  if (!item) return;
  const chosenItem = item.id;
  const pokeCard = () => {
    detailCard.innerHTML = '';
    const pokeList = filters.unfiltered();
    const chosenPoke = pokeList.find((chosen) => chosen.name === chosenItem);
    const nameContainer = document.createElement('a');
    detailCard.appendChild(nameContainer);
    picName = drawPicName(chosenPoke, nameContainer);
    const typeContainer = document.createElement('a');
    const typeP = document.createElement('p');
    typeP.innerHTML = 'Tipo: ';
    typeContainer.appendChild(typeP);
    types = drawType(chosenPoke.type, typeContainer);
    const weakP = document.createElement('p');
    weakP.innerHTML = 'Debil contra: ';
    typeContainer.appendChild(weakP);
    types = drawType(chosenPoke.weaknesses, typeContainer);
    detailCard.appendChild(typeContainer);
    const evolContainer = document.createElement('a');
    detailCard.appendChild(evolContainer);
    const prevEvol = chosenPoke.prev_evolution;
    const nextEvol = chosenPoke.next_evolution;
    let currentEvo;
    if (prevEvol && nextEvol) {
      console.log('prev and next');      
    }
    else if (prevEvol) {
      if (prevEvol.length === 1) {
        console.log('1 prev'); 
      }
      else {
        console.log('2 prev');
      }  
    }
    else if (nextEvol) {
      if (nextEvol.length === 1) {
        console.log('1 next'); 
      }
      else {
        console.log('2 next');
      }      
    };
  };
  pokeCard(item);
  detailCard.scrollIntoView({
    behavior: 'smooth', inline: 'end',
  });
};
listSection.addEventListener('click', pokeCards);

const showAll = () => {
  introText.style.display = 'none';
  navTypes.style.display = 'none';
  navEggs.style.display = 'none';
  listSection.textContent = '';
  const allPokemon = filters.unfiltered();
  print = drawPokeList(allPokemon);
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
  print = drawPokeList(showTopTen);
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
