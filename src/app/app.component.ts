import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Maze } from './logic/maze';
import { Config } from './types/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement> | undefined;

  private maze: Maze | undefined;
  private ctx!: CanvasRenderingContext2D;

  config: Config = {
    rows: 15,
    columns: 15,
    cellSize: 25,
    algorithm: 'huntAndKill',
  };

  ngOnInit() {
    if (!this.canvas) {
      throw new Error('Could not find canvas element');
    }

    const context = this.canvas.nativeElement.getContext('2d');
    if (!context) {
      throw new Error('Could not find rendering context');
    }

    this.ctx = context;

    this.generateMaze();
  }

  generateMaze() {
    this.maze = new Maze(
      [this.config.columns, this.config.rows],
      this.config.algorithm
    );
    this.drawMaze();
  }

  private drawMaze() {
    this.canvas!.nativeElement.width =
      this.config.columns * this.config.cellSize;
    this.canvas!.nativeElement.height = this.config.rows * this.config.cellSize;

    this.ctx.fillStyle = 'white';
    this.ctx.strokeStyle = 'black';
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 2;

    this.maze!.cells.forEach((cell) => {
      const cellSize = this.config.cellSize;
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
