import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MatButtonModule, MatCardModule, MatInputModule, MatSelectModule, MatSliderModule, MatToolbarModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IsochroneUiComponent } from './isochrone-ui/isochrone-ui.component';
import { EffectsModule } from '@ngrx/effects';
import { RouteEffects } from './state/route/route.effects';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    IsochroneUiComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatSliderModule,
    MatButtonModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([
      RouteEffects
    ]),
    StoreDevtoolsModule.instrument({
      name: 'OpenRouteService Application',
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
