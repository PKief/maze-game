import { Position, Walls } from '../types';

export class Cell {
  visited: boolean;
  walls: Walls;

  constructor(
    private _position: Position,
    private readonly mazeSize: Position
  ) {
    this.visited = false;
    this.walls = {
      north: true,
      south: true,
      east: true,
      west: true,
    };
  }

  get position() {
    return this._position;
  }

  getNeighbors(): Position[] {
    const x = this._position[0];
    const y = this._position[1];

    const north = y > 0 ? [x, y - 1] : undefined;
    const east = x < this.mazeSize[0] - 1 ? [x + 1, y] : undefined;
    const south = y < this.mazeSize[1] - 1 ? [x, y + 1] : undefined;
    const west = x > 0 ? [x - 1, y] : undefined;

    return [north, east, south, west].filter(
      (p) => p !== undefined
    ) as Position[];
  }
}
