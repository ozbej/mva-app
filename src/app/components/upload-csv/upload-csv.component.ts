import { Component, ViewChild } from '@angular/core';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-upload-csv',
  templateUrl: './upload-csv.component.html',
  styleUrls: ['./upload-csv.component.scss']
})

export class UploadCsvComponent {

  @ViewChild('csvReader') csvReader: any;

  constructor(private dbService: DbService) {}

  uploadListener($event: any): void {
    let files: string[] = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {
      let input: any = $event.target;
      let reader: FileReader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let startTime = performance.now();

        let csvData: any = reader.result;
        let csvRowsArray: any = (<string>csvData).split(/\r\n|\n/);

        let headerRow: any[] = this.getHeaderArray(csvRowsArray);
        
        let rows: any[] = this.getRowsFromCSV(csvRowsArray, headerRow);
        
        this.dbService.initDatabase(headerRow, rows);

        console.log(`Processing a dataset (${rows.length} rows with ${headerRow.length} columns) took ${performance.now() - startTime} milliseconds.`)
      }

      reader.onerror = () => {
        console.log("Error: Please import a valid CSV file.");
        this.csvReader.nativeElement.value = "";
      }
    }


  }

  isValidCSVFile(file: any): boolean {  
    return file.name.endsWith(".csv");  
  }

  getHeaderArray(csvRecordsArr: any): any[] {  
    let headers: string[] = (<string>csvRecordsArr[0]).split(',');
    let headerTypes: any[] = this.getHeaderTypes((<string>csvRecordsArr[1]).split(','));
    let headerArray: object[] = [];
    let currHeader: object = {};
    for (let i = 0; i < headers.length; i++) {
      currHeader = {
        title: headers[i],
        type: headerTypes[i]
      } 
      headerArray.push(currHeader);  
    }  
    return headerArray;  
  }

  getHeaderTypes(csvRow: any[]): any[] {
    let types: any[] = [];
    let currType: string = "";
    for (let i of csvRow) {
      currType = "string";
      if (parseInt(i)) currType = "int";
      else if (parseFloat(i)) currType = "float";
      types.push(currType);
    }
    return types;
  }

  getRowsFromCSV(rows: any[], headerRow: any[]): any[] {

    let allRows: any[] = [];
    let currRowObj: any = {};
    let currRowArr: any[]

    for (let i: number = 1; i < rows.length; i++) {
      currRowArr = (<string>rows[i]).split(',');
      currRowObj = {};

      if (currRowArr.length !== headerRow.length) continue;

      for (let j: number = 0; j < headerRow.length; j++) {
        currRowObj[headerRow[j].title] = currRowArr[j];
      }
      allRows.push(currRowObj);
    }

    return allRows;
  }
}
