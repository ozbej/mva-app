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

    Dexie.exists("dataset").then(exists => {
      if (!exists) {
        console.log("DB initialized");
        this.version(1).stores({
          rows: "++id",
          headerRow: "++id, title, type"
        });
      }

      this.open()
      .then(data => {
        console.log("DB opened");
        this.table('rows').toArray().then(data => this.setRows(data));
        this.table('headerRow').toArray().then(data => this.setHeaderRow(data));
      })
      .catch(err => console.log(err.message));
    });
  }

  async initDatabase(headerRow: any[], rows: any[]) {
    this.close();

    await this.delete();

    // Set indexing of db to all columns
    let indexString: string = "++id";
    for (let header of headerRow) {
      // If header starts with a number, add $ in front (indexedDB requirement)
      if (parseInt(header.title.charAt(0)))
        indexString += `, $${header.title}`;
      else
        indexString += `, ${header.title}`;
    }

    
    this.version(1).stores({
      rows: indexString,
      headerRow: "++id, title, type"
    });

    console.log(indexString);

    this.open()
    .then(data => console.log("DB Opened"));
    
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
