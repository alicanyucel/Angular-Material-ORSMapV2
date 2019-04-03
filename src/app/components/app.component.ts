/* tslint:disable:no-reference */
/// <reference path="../../../types/index.d.ts"/>
import { Component } from '@angular/core';
import { EsriService } from '../services/esri.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private esriService: EsriService) {}

  onClear(): void {
    this.esriService.clearLayers();
  }
}
