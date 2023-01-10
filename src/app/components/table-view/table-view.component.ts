import { Component, OnInit } from '@angular/core';
import { ProcessCsvService } from '../../services/process-csv.service';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {
  rows: any[] = [];
  headerRow: any[] = [];
  numCols: number = 0;

  constructor(private csvService: ProcessCsvService) {}

  ngOnInit(): void {
    this.csvService.getRows().subscribe((data: any[]) => (this.rows = data));
    this.csvService.getHeaderRow().subscribe((data: any[]) => (this.headerRow = data));
    this.csvService.getNumCols().subscribe((data: number) => (this.numCols = data));
  }

}
