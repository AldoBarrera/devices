import { Component, OnInit } from '@angular/core';
import { KeycloakService, KeycloakAuthGuard } from 'keycloak-angular';
@Component({
  selector: 'app-error403',
  templateUrl: './error403.component.html',
  styleUrls: ['./error403.component.css']
})
export class Error403Component implements OnInit {
  isLogged: boolean
  constructor(public keycloakService: KeycloakService) { }

  ngOnInit() {
    this.keycloakService.isLoggedIn().then(response => {
      this.isLogged = response;
   }); 
    
  }

  logout() {
    this.keycloakService.logout();
  }

  login() {
    this.keycloakService.login();
  }

}
