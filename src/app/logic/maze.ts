import { Position } from '../types';
import { Cell } from './cell';
import { shuffleArray } from './utils';

export class Maze {
  cells: Cell[] = [];

  constructor(mazeSize: Position) {
    for (let r = 0; r < mazeSize[0]; r++) {
      for (let c = 0; c < mazeSize[1]; c++) {
        const cell = new Cell([r, c], mazeSize);
        this.cells.push(cell);
      }
    }

    this.recursiveBacktracking();
  }

  private recursiveBacktracking() {
    const visitNextCell = (currentCell: Cell) => {
      currentCell.visited = true;
      const neighbors = currentCell
        .getNeighbors()
        .map(this.mapNeighborPositionsToCells());

      shuffleArray(neighbors).forEach((neighbor) => {
        if (neighbor.visited === false) {
          this.updateWall(currentCell, neighbor);
          visitNextCell(neighbor);
        }
      });
    };

    visitNextCell(this.cells[0]);
  }

  private huntAndKill() {
    const visitNextCell = (currentCell: Cell) => {
      currentCell.visited = true;
      const neighbors = currentCell
        .getNeighbors()
        .map(this.mapNeighborPositionsToCells());

      const nextNeighbor = shuffleArray(neighbors).filter(
        (n) => n.visited === false
      )[0];

      if (nextNeighbor) {
        this.updateWall(currentCell, nextNeighbor);
        visitNextCell(nextNeighbor);
      } else {
        return;
      }
    };

    const startCell = shuffleArray(this.cells)[0];
    visitNextCell(startCell);

    const getNextUnvisitedCell = () => {
      return this.cells
        .filter((cell) => cell.visited === false)
        .find((unvisitedCell) => {
          return (
            unvisitedCell
              .getNeighbors()
              .map(this.mapNeighborPositionsToCells())
              .filter((neighbor) => neighbor.visited === true).length > 0
          );
        });
    };

    let nextCell = getNextUnvisitedCell();
    while (nextCell) {
      const nextVisitedNeighbor = shuffleArray(
        nextCell
          .getNeighbors()
          .map(this.mapNeighborPositionsToCells())
          .filter((neighbor) => neighbor.visited === true)
      )[0];

      this.updateWall(nextCell, nextVisitedNeighbor);
      visitNextCell(nextCell);
      nextCell = getNextUnvisitedCell();
    }
  }

  private mapNeighborPositionsToCells() {
    return (neighbor: Position) => {
      return this.cells.find(
        (c) => c.position[0] === neighbor[0] && c.position[1] === neighbor[1]
      ) as Cell;
    };
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
