import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { environment } from '../environments/environment';

function iniciarKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: environment.authConfig,
      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframe: false,
        //silentCheckSsoRedirectUri: window.location.origin + '/assets/verify-sso.html'
      },
      //loadUserProfileAtStartUp: true,
      bearerExcludedUrls: [],
    });
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, KeycloakAngularModule, AppRoutingModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: iniciarKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
