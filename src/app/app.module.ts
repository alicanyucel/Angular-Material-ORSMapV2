import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MatButtonModule, MatCardModule, MatInputModule, MatSelectModule, MatSliderModule, MatToolbarModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IsochroneUiComponent } from './isochrone-ui/isochrone-ui.component';

@NgModule({
  declarations: [
    AppComponent,
    IsochroneUiComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    BrowserAnimationsModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatSliderModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
