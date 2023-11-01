import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UtenteService } from '../service/utente.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})


export class FormLoginComponent implements OnInit {

  constructor(private _utenteService: UtenteService, private _router: Router) { }

  risultato!: number;
  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });
  p!: string;
  u!: string;
  utente_log!: any;
  ruolo!: string;

  //--------------------- INIT -------------------------
  ngOnInit(): void {
    this.utente_log = sessionStorage.getItem("username");
    console.log(this.utente_log);
    if (this.utente_log)
      this._router.navigate(['/sceltaSondaggi']);
  }

  Accedi(): void {

    this.u = this.loginForm.get('username')?.value;
    this.p = this.loginForm.get('password')?.value;

    this._utenteService.login(this.u, this.p).subscribe({
      next: (risultato) => {
        this.risultato = risultato.code;
        this.ruolo = risultato.data;
        console.log("Codice Login:" + this.risultato);

        if (this.risultato == 1)
          sessionStorage.setItem('username', this.u);
          sessionStorage.setItem('ruolo', this.ruolo);
        window.location.reload();
      },
      error: (e) => console.error(e),
      complete: () => console.log()
    });
  }
}
