import { Component, ViewChild, Renderer2, AfterViewInit, ElementRef } from '@angular/core';

let data: any[] = [];
for (let i = 0; i < 30000; i++) {
  data.push(Array.from({length: 16}, () => Math.floor(Math.random() * 600)));
}

@Component({
  selector: 'app-parallel-coordinates-view',
  templateUrl: './parallel-coordinates-view.component.html',
  styleUrls: ['./parallel-coordinates-view.component.scss']
})
export class ParallelCoordinatesViewComponent implements AfterViewInit {
  @ViewChild('myCanvas', {static: false}) canvas: ElementRef = {} as ElementRef;
  public ctx: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.renderer.setAttribute(this.canvas.nativeElement, 'width', '800');
    this.renderer.setAttribute(this.canvas.nativeElement, 'height', '600');

    for (let line of data)
      this.drawLine(line);
  }

  drawLine(line: any[]): void {
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    for (let i = 1; i <= line.length; i++) {
      this.ctx.lineTo(i*50, line[i]);
      this.ctx.moveTo(i*50, line[i]);
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }
}
