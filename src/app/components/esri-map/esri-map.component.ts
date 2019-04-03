import { Component, OnDestroy, OnInit } from '@angular/core';
import { EsriService } from '../../services/esri.service';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.scss']
})
export class EsriMapComponent implements OnInit, OnDestroy {

  constructor(private mapService: EsriService) { }

  ngOnInit() {
    this.mapService.initializeMap('esri-map', [-83.4255176, 42.432238], 10);
  }

  ngOnDestroy(): void {
    this.mapService.tearDownMap();
  }
}
