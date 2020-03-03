document.getElementById('allPoke').addEventListener('click', showAll);
function showAll() {
  console.log("Mostrar Todos");
}

document.getElementById('topSpawn').addEventListener('click', showTopSpawns);
function showTopSpawns() {
  console.log("Top 10");
}

document.getElementById('pokeType').addEventListener('click', showByType);
function showByType() {
  console.log("Por Tipo");
}

document.getElementById('eggKm').addEventListener('click', showByEgg);
function showByEgg() {
  console.log("Por Huevo");
}

document.getElementById('home').addEventListener('click', restart);
function restart() {
  console.log("Pantalla Principal");
}

document.getElementById("poke").innerHTML("Pokemon 1")
