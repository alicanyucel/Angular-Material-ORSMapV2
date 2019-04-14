import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EsriLoaderModule } from '@val/esri-loader';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EsriMapComponent } from './components/esri-map/esri-map.component';
import { HeaderToolbarComponent } from './components/header-toolbar/header-toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchOptionsComponent,
    EsriMapComponent,
    HeaderToolbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    EsriLoaderModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([
      RouteEffects
    ]),
    StoreDevtoolsModule.instrument({
      name: 'OpenRouteService Application',
      logOnly: environment.production,
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
