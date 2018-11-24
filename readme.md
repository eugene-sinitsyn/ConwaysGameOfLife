# Conway's Game Of Life ([Wikipedia article](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life))

## Rules:
1. **Births**: Each dead cell adjacent to exactly three live neighbors will become live in the next generation.
2. **Survival**: Each live cell with either two or three live neighbors will remain alive for the next generation.
3. **Death by isolation**: Each live cell with one or fewer live neighbors will die in the next generation.
4. **Death by overcrowding**: Each live cell with four or more live neighbors will die in the next generation.

## Setup
1. Clone the repository
2. `npm start`

## Output
![Gosper Glider Gun](https://raw.githubusercontent.com/eugene-sinitsyn/ConwaysGameOfLife/master/gosper-glider-gun.gif)