const fs = require('fs');
const Generation = require('./generation');
const Terminal = require('./terminal');

process.on('SIGINT', () => process.exit());

Terminal.hideCarret();
process.on('SIGINT', () => {
  Terminal.showCarret();
  process.exit();
});

const config = fs.readFileSync('./simulations/gosper-glider-gun.txt').toString();
let generation = new Generation(config);

setInterval(() => {
  console.clear();
  Terminal.braille(generation);
  generation = new Generation(generation);
}, 30);