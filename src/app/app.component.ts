import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile, KeycloakRoles } from 'keycloak-js';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'keycloakAuthentication';
  public isLogado = false;
  public perfilUsuario: KeycloakProfile | null = null;

  constructor(
    private readonly keycloak: KeycloakService,
    private spinner: NgxSpinnerService
  ) {}

  public async ngOnInit() {
    this.isLogado = await this.keycloak.isLoggedIn();

    type rolesUsuarios = Array<{ id: number; text: string }>;

    if (this.isLogado) {
      this.perfilUsuario = await this.keycloak.loadUserProfile();
      console.log(this.perfilUsuario);
    }

    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
  }

  public login() {
    this.keycloak.login();
  }

  public logout() {
    this.keycloak.logout();
  }
}
