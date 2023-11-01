import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Utente } from '../model/utente';
import { UtenteService } from '../service/utente.service';

@Component({
  selector: 'app-form-registra',
  templateUrl: './form-registra.component.html',
  styleUrls: ['./form-registra.component.css']
})
export class FormRegistraComponent implements OnInit {
  utente: Utente;
  termini: boolean = false;
  messaggio!: string;

  registraForm: FormGroup;
  username: FormControl;
  password: FormControl;
  email: FormControl;

  code!: number;

  constructor(private _utenteService: UtenteService, private _router: Router, fb: FormBuilder) {
    this.registraForm = fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
      'email': ['', Validators.required],
    });

    this.utente = new Utente();

    this.username = this.registraForm.controls['username'] as FormControl;
    this.password = this.registraForm.controls['password'] as FormControl;
    this.email = this.registraForm.controls['email'] as FormControl;
  }

  ngOnInit(): void {
  }

  Registrati(): void {
    if (this.termini) {
      this._utenteService.registra(this.utente.username, this.utente.password, this.utente.email).subscribe({
        next: (response) => {
          this.code = response.code;
          if (this.code == 1)
            this._router.navigate(['/login']);
          else
            this.messaggio = "Registrazione fallita"
        },
        error: (e) => console.error(e),
        complete: () => console.log("registrazione completata!")
      });
    }
    else {
      this.messaggio = 'Devi accettare i termini e le condizioni';
    }
    window.location.reload;
  }
}
