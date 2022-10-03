import { Cell } from './cell';
import { Position } from './position';
import { shuffleArray } from './utils';

export class Maze {
  cells: Cell[] = [];

  constructor(private mazeSize: Position) {
    for (let r = 0; r < mazeSize[0]; r++) {
      for (let c = 0; c < mazeSize[1]; c++) {
        const cell = new Cell([r, c]);
        this.cells.push(cell);
      }
    }

    this.recursiveBacktrackingGeneration(this.cells[0]);
  }

  private recursiveBacktrackingGeneration(currentCell: Cell) {
    currentCell.visited = true;
    const neighbors = currentCell
      .getNeighbors(this.mazeSize)
      .map(
        (neighbor) =>
          this.cells.find(
            (c) =>
              c.position[0] === neighbor[0] && c.position[1] === neighbor[1]
          ) as Cell
      );

    shuffleArray(neighbors).forEach((neighbor) => {
      if (neighbor.visited === false) {
        this.updateWall(currentCell, neighbor);
        this.recursiveBacktrackingGeneration(neighbor);
      }
    });
  }

  private updateWall(currentCell: Cell, neighbor: Cell) {
    if (neighbor.position[0] > currentCell.position[0]) {
      currentCell.walls.east = false;
      neighbor.walls.west = false;
    } else if (neighbor.position[0] < currentCell.position[0]) {
      currentCell.walls.west = false;
      neighbor.walls.east = false;
    } else if (neighbor.position[1] > currentCell.position[1]) {
      currentCell.walls.south = false;
      neighbor.walls.north = false;
    } else if (neighbor.position[1] < currentCell.position[1]) {
      currentCell.walls.north = false;
      neighbor.walls.south = false;
    }
  }
}
