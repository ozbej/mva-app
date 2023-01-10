import { Component, ViewChild } from '@angular/core';
import { ProcessCsvService } from '../../services/process-csv.service';

@Component({
  selector: 'app-upload-csv',
  templateUrl: './upload-csv.component.html',
  styleUrls: ['./upload-csv.component.scss']
})

export class UploadCsvComponent {

  @ViewChild('csvReader') csvReader: any;

  constructor(private csvService: ProcessCsvService) {}

  uploadListener($event: any): void {
    let files: string[] = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {
      let input: any = $event.target;
      let reader: FileReader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData: any = reader.result;
        let csvRowsArray: any = (<string>csvData).split(/\r\n|\n/);

        let headerRow: any[] = this.getHeaderArray(csvRowsArray);
        let numCols: number = headerRow.length;

        let rows: any[] = this.getRowsFromCSV(csvRowsArray, numCols);

        let parallelCoordinates = this.prepareParallelCoordinates(headerRow, rows);

        this.csvService.setRows(rows);
        this.csvService.setHeaderRow(headerRow);
        this.csvService.setNumCols(numCols);
        this.csvService.setParallelCoordinates(parallelCoordinates);
      }

      reader.onerror = () => {
        console.log("Error: Please import a valid CSV file.");
        this.csvReader.nativeElement.value = "";
        this.csvService.setRows([]);
        this.csvService.setHeaderRow([]);
        this.csvService.setNumCols(0);
        this.csvService.setParallelCoordinates({});
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

  getRowsFromCSV(csvRowsArray: any[], numCols: number): any[] {
    let csvArr: any[] = [];

    for (let i = 1; i < csvRowsArray.length; i++) {
      let currentRow: any[] = (<string>csvRowsArray[i]).split(',');
      
      if (currentRow.length === numCols) 
        csvArr.push(currentRow)
    }

    return csvArr;
  }

  prepareParallelCoordinates(headerRow: any[], rows: any[]): object {
    return {
      chart: {
        parallelCoordinates: true
      },
      yAxis: [{
        min: 0,
        max: 10,
      }, {
        min: 0,
        max: 10
      }, {
        min: 0,
        max: 10
      }, {
        min: 0,
        max: 10
      }, {
        min: 0,
        max: 10
      }],
      series: [
        {
          data: [2, 6, 3, 2, 4],
          type: "line"
        },
        {
          data: [1, 5, 6, 8, 9],
          type: "line"
        }
      ]
  
    };
  }

}
