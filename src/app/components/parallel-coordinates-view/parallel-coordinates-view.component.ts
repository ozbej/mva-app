import { Component, OnInit } from '@angular/core';
import { ProcessCsvService } from '../../services/process-csv.service';
import * as Highcharts from "highcharts";

const parallelCoordinates = require("highcharts/modules/parallel-coordinates.js");
parallelCoordinates(Highcharts)

@Component({
  selector: 'app-parallel-coordinates-view',
  templateUrl: './parallel-coordinates-view.component.html',
  styleUrls: ['./parallel-coordinates-view.component.scss']
})
export class ParallelCoordinatesViewComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chart: any;
  updateFlag: boolean = false;
  chartConstructor: string = "chart";
  chartCallback: Highcharts.ChartCallbackFunction;
  chartOptions: Highcharts.Options = {
    title: { text: undefined }
  };

  constructor(private csvService: ProcessCsvService) {
    const self = this;

    this.chartCallback = chart => {
      self.chart = chart;
    }
  }

  ngOnInit(): void {
    this.csvService.getParallelCoordinates().subscribe((data: object) => {
      const self = this;
      self.chartOptions = data;
      self.updateFlag = true;
    });
  }

  ngOnDestroy(): void {
    this.csvService.getParallelCoordinates().unsubscribe();
  }
}
