import { Generation } from './generation';
import { Point } from './point';

export class Terminal {
  public static hideCarret(): void {
    console.log('\x1B[?25l');
  }

  public static showCarret(): void {
    console.log('\x1B[?25h');
  }

  public static braille(generation: Generation): void {
    const width = Math.ceil(generation.size.x / 2);
    const height = Math.ceil(generation.size.y / 4);
    const braillePatterns: string[][] = new Array(height);
    for (let y = 0; y < height; y++) {
      braillePatterns[y] = new Array(width);
      for (let x = 0; x < width; x++) {
        let code: number = 0x2800;
        if (generation.cell(new Point(2 * x, 4 * y))) code |= 0x1;
        if (generation.cell(new Point(2 * x, 4 * y + 1))) code |= 0x2;
        if (generation.cell(new Point(2 * x, 4 * y + 2))) code |= 0x4;
        if (generation.cell(new Point(2 * x + 1, 4 * y))) code |= 0x8;
        if (generation.cell(new Point(2 * x + 1, 4 * y + 1))) code |= 0x10;
        if (generation.cell(new Point(2 * x + 1, 4 * y + 2))) code |= 0x20;
        if (generation.cell(new Point(2 * x, 4 * y + 3))) code |= 0x40;
        if (generation.cell(new Point(2 * x + 1, 4 * y + 3))) code |= 0x80;
        braillePatterns[y][x] = String.fromCharCode(code);
      }
    }
    console.log(braillePatterns.map(col => col.join('')).join('\n'));
  }
}