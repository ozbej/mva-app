import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {
  rows: any[] = [];
  headerRow: any[] = [];

  constructor(private dbService: DbService) {}

  ngOnInit(): void {
    this.dbService.getRows().subscribe((data: any) => (this.rows = data));
    this.dbService.getHeaderRow().subscribe((data: any) => (this.headerRow = data));
  }

  ngOnDestroy(): void {
    this.dbService.getRows().unsubscribe();
    this.dbService.getHeaderRow().unsubscribe();
  }

}
