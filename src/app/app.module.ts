import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { SceltaSondaggioComponent } from './scelta-sondaggio/scelta-sondaggio.component';
import { UtenteService } from './service/utente.service';
import { UtentesondaggioService } from './service/utentesondaggio.service';
import { SondaggioService } from './service/sondaggio.service';
import { OpzioneService } from './service/opzione.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddSondaggiComponent } from './admin/add-sondaggi/add-sondaggi.component';
import { VotaComponent } from './vota/vota.component';
import { LogoutComponent } from './logout/logout.component';
import { FormRegistraComponent } from './form-registra/form-registra.component';
import { ModificaSondaggioComponent } from './admin/modifica-sondaggio/modifica-sondaggio.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: FormLoginComponent },
  { path: 'registra', component: FormRegistraComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'sceltaSondaggi', component: SceltaSondaggioComponent},
  { path: 'aggiungiSondaggi', component: AddSondaggiComponent},
  { path: 'vota/:id', component: VotaComponent},
  { path: 'logout', component: LogoutComponent },
  { path: 'modificaSondaggio/:id', component: ModificaSondaggioComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FormLoginComponent,
    SceltaSondaggioComponent,
    AddSondaggiComponent,
    VotaComponent,
    LogoutComponent,
    FormRegistraComponent,
    ModificaSondaggioComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    UtenteService,
    UtentesondaggioService,
    SondaggioService,
    OpzioneService
 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
