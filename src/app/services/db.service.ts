import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService extends Dexie {
  private rows = new Subject<any>();
  private headerRow = new Subject<any>();

  constructor() {
    super("dataset");

    this.version(2).stores({
      rows: "++id",
      headerRow: "++id, title, type"
    })

    // Initialize database
    this.open()
    .then(data => console.log("DB Opened"))
    .catch(err => console.log(err.message));

    this.table('rows').toArray().then(data => this.setRows(data));
    this.table('headerRow').toArray().then(data => this.setHeaderRow(data));
  }

  initDatabase(headerRow: any[], rows: any[]): void {
    // Clear database
    this.table('rows').clear();
    this.table('headerRow').clear();

    // Insert headerRow and rows to db
    this.table('headerRow').bulkAdd(headerRow);
    this.table('rows').bulkAdd(rows);

    // Set headeRow and rows
    this.table('headerRow').toArray().then(data => {
      this.setHeaderRow(data)
    });
    this.table('rows').toArray().then(data => {
      this.setRows(data)
    });
  }

  setRows(rows: any[]): void {
    this.rows.next(rows);
  }

  getRows(): any {
    return this.rows.asObservable();
  }

  setHeaderRow(headerRow: any[]): void {
    this.headerRow.next(headerRow);
  }

  getHeaderRow(): any {
    return this.headerRow.asObservable();
  }
}
