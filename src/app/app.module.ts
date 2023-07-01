import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitLDClient } from './services/init-LDClient.service';

export const initializeLdClient = (initLDClient: InitLDClient) => {
  return async () => {
    const lDinitd = await initLDClient.initialize();
    return lDinitd;
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeLdClient,
      multi: true,
      deps: [InitLDClient]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
