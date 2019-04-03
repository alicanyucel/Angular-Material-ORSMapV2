import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from './components/app.component';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchOptionsComponent } from './components/search-options/search-options.component';
import { EffectsModule } from '@ngrx/effects';
import { RouteEffects } from './state/route/route.effects';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MaterialModule } from './shared/material.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EsriMapComponent } from './components/esri-map/esri-map.component';
import { EsriService } from './services/esri.service';

export function initializer(esriService: EsriService) {
  return () => esriService.initializeApi();
}

@NgModule({
  declarations: [
    AppComponent,
    SearchOptionsComponent,
    EsriMapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([
      RouteEffects
    ]),
    StoreDevtoolsModule.instrument({
      name: 'OpenRouteService Application',
      logOnly: environment.production,
    }),
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: initializer, multi: true, deps: [EsriService] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
