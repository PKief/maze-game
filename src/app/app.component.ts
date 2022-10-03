import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Maze } from './logic/maze';
import { shuffleArray } from './logic/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement> | undefined;
  readonly maze: Maze;

  private ctx!: CanvasRenderingContext2D;

  constructor() {
    this.maze = new Maze([15, 15]);
  }

  ngOnInit() {
    if (!this.canvas) {
      throw new Error('Could not find canvas element');
    }

    const context = this.canvas.nativeElement.getContext('2d');
    if (!context) {
      throw new Error('Could not find rendering context');
    }

    this.canvas.nativeElement.width = 500;
    this.canvas.nativeElement.height = 500;
    this.ctx = context;
    this.drawMaze();
  }

  private drawMaze() {
    const cellSize = 25;
    this.ctx.fillStyle = 'white';
    this.ctx.strokeStyle = 'black';
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 2;

    this.maze.cells.forEach((cell) => {
      this.ctx.beginPath();
      this.ctx.fillRect(
        cell.position[0] * cellSize,
        cell.position[1] * cellSize,
        cellSize,
        cellSize
      );
      this.ctx.closePath();

      if (cell.walls.north) {
        this.ctx.moveTo(
          cell.position[0] * cellSize,
          cell.position[1] * cellSize
        );
        this.ctx.lineTo(
          cell.position[0] * cellSize + cellSize,
          cell.position[1] * cellSize
        );
        this.ctx.stroke();
      }

      if (cell.walls.east) {
        this.ctx.moveTo(
          cell.position[0] * cellSize + cellSize,
          cell.position[1] * cellSize
        );
        this.ctx.lineTo(
          cell.position[0] * cellSize + cellSize,
          cell.position[1] * cellSize + cellSize
        );
        this.ctx.stroke();
      }

      if (cell.walls.south) {
        this.ctx.moveTo(
          cell.position[0] * cellSize,
          cell.position[1] * cellSize + cellSize
        );
        this.ctx.lineTo(
          cell.position[0] * cellSize + cellSize,
          cell.position[1] * cellSize + cellSize
        );
        this.ctx.stroke();
      }

      if (cell.walls.west) {
        this.ctx.moveTo(
          cell.position[0] * cellSize,
          cell.position[1] * cellSize
        );
        this.ctx.lineTo(
          cell.position[0] * cellSize,
          cell.position[1] * cellSize + cellSize
        );
        this.ctx.stroke();
      }
    });
  }
}
