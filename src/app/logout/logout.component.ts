import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtenteService } from '../service/utente.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  response!: any;
  utente_log!: any;

  constructor(private _router: Router, private _utenteService: UtenteService) { }

   //--------------------- INIT -------------------------
  ngOnInit(): void { 
    this.utente_log = sessionStorage.getItem("username");
    console.log(this.utente_log);
    if(!this.utente_log)
      this._router.navigate(['/login']);
  }

  confermaLogout(): void {
    sessionStorage.clear();
    this._utenteService.logout().subscribe({
      next: (x) => this.response = x,
      error: (e) => console.error(e),
      complete: () => console.log("complete!")
    });

    window.location.reload();
  }
}
