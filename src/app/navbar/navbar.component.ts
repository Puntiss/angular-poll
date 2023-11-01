import { Component, OnInit } from '@angular/core';
import { Utente } from '../model/utente';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  username: string | null = null;
  ruolo: any;
  constructor() { }

  ngOnInit(): void {

    this.username = sessionStorage.getItem('username');
    console.log("USERNAME = "+ this.username);
    this.ruolo = sessionStorage.getItem('ruolo');
    console.log("ROLE = "+ this.ruolo);

  }

}
