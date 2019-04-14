/* tslint:disable:only-arrow-functions */
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { bootstrapper } from './esri-surface';

export function init() {
  return function() {
    return bootstrapper.init();
  };
}

@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: init, multi: true }
  ],
})
export class EsriLoaderModule { }
