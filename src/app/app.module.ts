import {
  APP_INITIALIZER,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { environment } from '../environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Import library module
import { NgxSpinnerModule } from 'ngx-spinner';

function iniciarKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak
      .init({
        config: environment.authConfig,
        initOptions: {
          onLoad: 'check-sso',
          checkLoginIframe: false,
          //silentCheckSsoRedirectUri: window.location.origin + '/assets/verify-sso.html'
        },
        //loadUserProfileAtStartUp: true,
        bearerExcludedUrls: [],
      })
      .catch((error) => {
        console.error('Erro', error);
      });
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    KeycloakAngularModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: iniciarKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
