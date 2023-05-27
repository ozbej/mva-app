import { Component, ViewChild, Renderer2, AfterViewInit, ElementRef } from '@angular/core';

let data: any[] = [];
for (let i = 0; i < 100; i++) {
  data.push(Array.from({length: 20}, () => Math.floor(Math.random() * 600)));
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

    this.renderer.setAttribute(this.canvas.nativeElement, 'width', '1800');
    this.renderer.setAttribute(this.canvas.nativeElement, 'height', '600');

    for (let line of data)
      this.drawLine(line);
  }

  drawLine(line: any[]): void {
    this.ctx.beginPath();
    for (let i = 1; i <= line.length; i++) {
      this.ctx.lineTo(i*100, line[i]);
      this.ctx.moveTo(i*100, line[i]);
      this.ctx.stroke();
      this.ctx.strokeStyle = "#0000ff";
      this.ctx.closePath();
    }
  }
}
