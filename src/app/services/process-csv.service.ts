import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessCsvService {
  private rows = new ReplaySubject<any>();
  private headerRow = new ReplaySubject<any>();
  private numCols = new ReplaySubject<any>();
  private parallelCoordinates = new ReplaySubject<any>();

  constructor() { }

  setRows(rows: any[]): void {
    this.rows.next(rows);
  }

  getRows(): any {
    return this.rows.asObservable();
  }

  setHeaderRow(row: any[]): void {
    this.headerRow.next(row);
  }

  getHeaderRow(): any {
    return this.headerRow.asObservable();
  }

  setNumCols(numCols: number): void {
    this.numCols.next(numCols);
  }

  getNumCols(): any {
    return this.numCols.asObservable();
  }

  setParallelCoordinates(options: object): void {
    this.parallelCoordinates.next(options);
  }

  getParallelCoordinates(): any {
    return this.parallelCoordinates.asObservable();
  }
}
