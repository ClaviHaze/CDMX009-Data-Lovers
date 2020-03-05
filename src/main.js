//AQUÍ VA LA MANIPULACIÓN DEL DOM
import {example} from './data.js'

let showAll = () => {
  document.getElementById('egg').style.display = 'none';
  document.getElementById('types').style.display = 'none';
  document.getElementById('datatest').innnerHTML(example);
}
document.getElementById('allPoke').addEventListener('click', showAll);

let showTopSpawns = () => {
  document.getElementById('egg').style.display = 'none';
  document.getElementById('types').style.display = 'none';
}
document.getElementById('topSpawn').addEventListener('click', showTopSpawns);

let showByType = () => {
  document.getElementById('egg').style.display = 'none';
  document.getElementById('types').style.display = 'flex';
}
document.getElementById('pokeType').addEventListener('click', showByType);

let showByEgg = () => {
  document.getElementById('egg').style.display = 'flex';
  document.getElementById('types').style.display = 'none';
}
document.getElementById('eggKm').addEventListener('click', showByEgg);

let restart = () => {
  document.getElementById('egg').style.display = 'none';
  document.getElementById('types').style.display = 'none';
}
document.getElementById('home').addEventListener('click', restart);
