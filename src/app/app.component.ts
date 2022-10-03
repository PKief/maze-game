import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement> | undefined;

  private ctx: CanvasRenderingContext2D | undefined | null;

  ngOnInit() {
    if (this.canvas) {
      this.canvas.nativeElement.width = 500;
      this.canvas.nativeElement.height = 500;
    }
    this.ctx = this.canvas?.nativeElement?.getContext('2d');
    if (this.ctx) {
      this.ctx.fillStyle = 'red';
      this.ctx.fillRect(0, 0, 500, 500);
    }
  }
}
