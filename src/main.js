//AQUÍ VA LA MANIPULACIÓN DEL DOM
import icons from './icons.js'
import {example, filter} from './data.js'
console.log(filter);
console.log(example);

const navTypes = document.querySelector('#types');
const navEggs = document.querySelector('#egg');

let showAll = (example) => {
  document.getElementById('egg').style.display = 'none';
  document.getElementById('types').style.display = 'none';
}
document.getElementById('allPoke').addEventListener('click', showAll);

const pokeTable = document.querySelector('#pokeList');
const typeTable = document.querySelector('#type');
const eggTable = document.querySelector('#egg');
let selected;
let tableFunction = (event) => {
  let item = event.target.closest('td');
  let chosenItem = item.id;
  console.log(chosenItem);
  if (!item) return;
  if (!pokeTable.contains(item)) return;
  highlight(item);
};
let highlight = (node) => {
  if (selected) {
    selected.classList.remove('highlight');
  }
  selected = node;
  selected.classList.add('highlight');
}
document.getElementById('pokeList').addEventListener('click', tableFunction);
document.getElementById('types').addEventListener('click', tableFunction);
document.getElementById('egg').addEventListener('click', tableFunction);

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
    const typeImg = document.createElement('img');
    const typeBtn = document.createElement('td');
    typeImg.src = icons.types[i];
    typeBtn.setAttribute('id', icons.typeName[i]);
    typeBtn.setAttribute('class', 'listBtn');
    typeBtn.appendChild(typeImg);
    navTypes.appendChild(typeBtn);
  }
}
document.getElementById('pokeType').addEventListener('click', showTypeList);

let showEggList = () => {
  document.getElementById('egg').style.display = 'flex';
  document.getElementById('types').style.display = 'none';
  navEggs.textContent = '';
  for (let i=0; i < icons.eggs.length; i++) {
    const eggBtn = document.createElement('td');
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

let restart = () => {
  document.getElementById('egg').style.display = 'none';
  document.getElementById('types').style.display = 'none';
}
document.getElementById('home').addEventListener('click', restart);
