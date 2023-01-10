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

        this.csvService.setRows(rows);
        this.csvService.setHeaderRow(headerRow);
        this.csvService.setNumCols(numCols);
      }

      reader.onerror = () => {
        console.log("Error: Please import a valid CSV file.");
        this.csvReader.nativeElement.value = "";
        this.csvService.setRows([]);
        this.csvService.setHeaderRow([]);
        this.csvService.setNumCols(0);
      }
    }


  }

  isValidCSVFile(file: any): boolean {  
    return file.name.endsWith(".csv");  
  }

  getHeaderArray(csvRecordsArr: any): any[] {  
    let headers = (<string>csvRecordsArr[0]).split(',');  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j]);  
    }  
    return headerArray;  
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

}
