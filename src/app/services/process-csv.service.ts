import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessCsvService {
  private rows = new Subject<any[]>();
  private headerRow = new Subject<any[]>();
  private numCols = new Subject<number>();

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
}
