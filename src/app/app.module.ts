import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadCsvComponent } from './components/upload-csv/upload-csv.component';
import { TableViewComponent } from './components/table-view/table-view.component';
import { ParallelCoordinatesViewComponent } from './components/parallel-coordinates-view/parallel-coordinates-view.component';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    AppComponent,
    UploadCsvComponent,
    TableViewComponent,
    ParallelCoordinatesViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
