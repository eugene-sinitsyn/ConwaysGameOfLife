import * as fs from 'fs';
import { Generation } from './generation';
import { Terminal } from './terminal';

const config = fs.readFileSync('./simulations/gosper-glider-gun.txt').toString();

let generation = new Generation(config);

Terminal.hideCarret();
process.on('SIGINT', () => {
  Terminal.showCarret();
  process.exit();
});

setInterval(() => {
  console.clear();
  Terminal.braille(generation);
  generation = new Generation(generation);
}, 30);