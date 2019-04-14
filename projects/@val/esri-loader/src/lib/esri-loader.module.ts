/* tslint:disable:only-arrow-functions */
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { __bootstrapper } from './esri-surface';

export function init() {
  return function() {
    return __bootstrapper.init();
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
