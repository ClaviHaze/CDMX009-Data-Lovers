import icons from './icons.js';

import filters from './data.js';

let selected;
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
  detailCard.style.display = 'none';
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
};

const drawStats = (content, container) => {
  const innerCont = document.createElement('tr');
  const height = document.createElement('p');
  const weight = document.createElement('p');
  const egg = document.createElement('p');
  const spawnChnc = document.createElement('p');
  const avgSpwn = document.createElement('p');
  const spwnTime = document.createElement('p');
  const mult = document.createElement('p');
  height.innerHTML = `Altura: ${content.height}`;
  weight.innerHTML = `Peso: ${content.weight}`;
  spawnChnc.innerHTML = `Posibilidad de Aparición: ${content.spawn_chance}`;
  avgSpwn.innerHTML = `Aparicion Promedio: ${content.avg_spawns}`;
  spwnTime.innerHTML = `Aparece durante ${content.spawn_time} min.`;
  innerCont.appendChild(height);
  innerCont.appendChild(weight);
  innerCont.appendChild(spawnChnc);
  innerCont.appendChild(avgSpwn);
  innerCont.appendChild(spwnTime);
  if (content.multipliers) {
    if (content.multipliers.length === 1) {
      mult.innerHTML = `${'Multiplicador: x'}${content.multipliers[0]}`;
      innerCont.appendChild(mult);
    } else if (content.multipliers.length === 2) {
      mult.innerHTML = `${'Multiplicadores: x'}${content.multipliers[0]}, x${content.multipliers[1]}`;
      innerCont.appendChild(mult);
    }
  }
  if (content.egg === 'Not in Eggs') {
    egg.innerHTML = 'Este Pokemón no eclosiona de ningún huevo';
    innerCont.appendChild(egg);
  } else {
    egg.innerHTML = `Eclosiona de los huevos de ${content.egg}`;
    innerCont.appendChild(egg);
  }
  container.appendChild(innerCont);
};

const evoTreePic = (content, innerCont) => {
  const pokepic = document.createElement('img');
  const idname = document.createElement('p');
  const picAndName = document.createElement('a');
  pokepic.setAttribute('class', 'evoPic');
  picAndName.setAttribute('class', 'evoName');
  const pokeList = filters.unfiltered();
  const pokemon = pokeList.find((poke) => poke.name === content.name);
  pokepic.src = pokemon.img;
  idname.innerHTML = pokemon.name;
  picAndName.appendChild(pokepic);
  picAndName.appendChild(idname);
  innerCont.appendChild(picAndName);
};

const drawType = (content, container) => {
  const elementCont = document.createElement('tr');
  elementCont.setAttribute('class', 'typeList');
  content.forEach((element) => {
    const type = document.createElement('img');
    type.setAttribute('id', element);
    type.setAttribute('class', 'pokeType');
    const typeSrc = icons.typeSrc.find((srcType) => srcType.name === element);
    type.src = typeSrc.imgSrc;
    elementCont.appendChild(type);
  });
  container.appendChild(elementCont);
};

const drawCandy = (content, container) => {
  const candyPic = document.createElement('img');
  const candyNum = document.createElement('small');
  const picAndNum = document.createElement('a');
  picAndNum.appendChild(candyPic);
  picAndNum.appendChild(candyNum);
  candyPic.src = 'images/candy.svg';
  candyPic.setAttribute('class', 'candy');
  picAndNum.setAttribute('class', 'candyCount');
  const pokeList = filters.unfiltered();
  const pokemon = pokeList.find((poke) => poke.name === content.name);
  candyNum.innerHTML = pokemon.candy_count;
  container.appendChild(picAndNum);
};

const drawEvol = (data1, data2, container) => {
  if (data2 === '') {
    evoTreePic(data1, container);
  } else {
    evoTreePic(data1, container);
    drawCandy(data1, container);
    evoTreePic(data2, container);
  }
};

const drawCurrentEvo = (content, container) => {
  const pokepic = document.createElement('img');
  const idname = document.createElement('p');
  const picAndName = document.createElement('a');
  pokepic.src = content.img;
  pokepic.setAttribute('class', 'evoPic');
  picAndName.setAttribute('class', 'evoName');
  idname.innerHTML = content.name;
  picAndName.appendChild(pokepic);
  picAndName.appendChild(idname);
  container.appendChild(picAndName);
  if (content.candy_count) {
    const picAndNum = document.createElement('a');
    const candyPic = document.createElement('img');
    const candyNum = document.createElement('small');
    picAndNum.appendChild(candyPic);
    picAndNum.appendChild(candyNum);
    candyPic.src = 'images/candy.svg';
    candyPic.setAttribute('class', 'candy');
    picAndNum.setAttribute('class', 'candyCount');
    candyNum.innerHTML = content.candy_count;
    container.appendChild(picAndNum);
  }
};

const drawPokeList = (list) => {
  listSection.textContent = '';
  list.forEach((pokemon) => {
    const card = document.createElement('td');
    listSection.appendChild(card);
    card.setAttribute('id', pokemon.name);
    card.setAttribute('class', 'pokeBtn');
    drawPicName(pokemon, card);
    drawType(pokemon.type, card);
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
    drawPokeList(filtered);
  } else if (icons.typeName.includes(chosenItem)) {
    const filtered = filters.filterByType(chosenItem);
    drawPokeList(filtered);
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
    const allList = filters.unfiltered();
    const chosenPoke = allList.find((chosen) => chosen.name === chosenItem);
    const nameContainer = document.createElement('tr');
    nameContainer.setAttribute('class', 'container');
    detailCard.appendChild(nameContainer);
    drawPicName(chosenPoke, nameContainer);
    const statsContainer = document.createElement('tr');
    detailCard.appendChild(statsContainer);
    statsContainer.setAttribute('class', 'container');
    drawStats(chosenPoke, statsContainer);
    const typeContainer = document.createElement('tr');
    detailCard.appendChild(typeContainer);
    typeContainer.setAttribute('class', 'container');
    const typeP = document.createElement('p');
    typeP.innerHTML = 'Tipo: ';
    typeContainer.appendChild(typeP);
    drawType(chosenPoke.type, typeContainer);
    const weakP = document.createElement('p');
    weakP.innerHTML = 'Debil contra: ';
    typeContainer.appendChild(weakP);
    drawType(chosenPoke.weaknesses, typeContainer);
    const evolContainer = document.createElement('tr');
    detailCard.appendChild(evolContainer);
    evolContainer.setAttribute('class', 'container');
    const prevEvol = chosenPoke.prev_evolution;
    const nextEvol = chosenPoke.next_evolution;
    if (prevEvol && nextEvol) {
      const prev1 = prevEvol[0];
      const prev2 = '';
      const next1 = nextEvol[0];
      const next2 = '';
      drawEvol(prev1, prev2, evolContainer);
      drawCandy(prev1, evolContainer);
      drawCurrentEvo(chosenPoke, evolContainer);
      drawEvol(next1, next2, evolContainer);
    } else if (prevEvol) {
      if (prevEvol.length === 1) {
        const prev1 = prevEvol[0];
        const prev2 = '';
        drawEvol(prev1, prev2, evolContainer);
        drawCandy(prev1, evolContainer);
        drawCurrentEvo(chosenPoke, evolContainer);
      } else {
        const prev1 = prevEvol[0];
        const prev2 = prevEvol[1];
        drawEvol(prev1, prev2, evolContainer);
        drawCandy(prev2, evolContainer);
        drawCurrentEvo(chosenPoke, evolContainer);
      }
    } else if (nextEvol) {
      if (nextEvol.length === 1) {
        const next1 = nextEvol[0];
        const next2 = '';
        drawCurrentEvo(chosenPoke, evolContainer);
        drawEvol(next1, next2, evolContainer);
      } else {
        const next1 = nextEvol[0];
        const next2 = nextEvol[1];
        drawCurrentEvo(chosenPoke, evolContainer);
        drawEvol(next1, next2, evolContainer);
      }
    } else if (!prevEvol && !nextEvol) {
      const notice = document.createElement('p');
      notice.innerHTML = 'Este Pokemón no evoluciona';
      evolContainer.appendChild(notice);
    }
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
  drawPokeList(allPokemon);
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
  drawPokeList(showTopTen);
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
