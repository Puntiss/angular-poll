import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Opzione } from '../model/opzione';
import { Sondaggio } from '../model/sondaggio';
import { OpzioneService } from '../service/opzione.service';
import { SondaggioService } from '../service/sondaggio.service';
import { UtentesondaggioService } from '../service/utentesondaggio.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vota',
  templateUrl: './vota.component.html',
  styleUrls: ['./vota.component.css']
})
export class VotaComponent implements OnInit {

  private baseURL = environment.host + environment.portAPI + '/api/utente';
  private frontendBaseURL = environment.host + environment.portFE;
  constructor(
    private _Activatedroute: ActivatedRoute,
    private _sondaggioService: SondaggioService,
    private _opzioneService: OpzioneService,
    private _utenteSondaggioService: UtentesondaggioService,
) {}

  sondaggio = new Sondaggio();
  listaOpzioni: Opzione[] = [];
  id_sondaggio!: number;
  id_opzione!: number;

  ruolo!: any;
  totvoti!: number;

  ngOnInit(): void {
    this.totvoti = 0;

    //Ottenimento ID sondaggio
    this._Activatedroute.paramMap.subscribe(params => {
      this.id_sondaggio = Number(params.get('id'));
    });

    //Ottenimento Sondaggio
    this._sondaggioService.getSondaggio(this.id_sondaggio).subscribe({
      next: (sondaggio) => this.sondaggio = sondaggio,
      error: (e) => console.error(e),
      complete: () => console.log()
    });

    //Ottenimento Opzioni relative al Sondaggio 
    this._opzioneService.getOpzioniSondaggo(this.id_sondaggio).subscribe({
      next: (opzioni) => {
        this.listaOpzioni = opzioni;
        this.listaOpzioni.forEach(o => {
          this._opzioneService.countVoti(o.id).subscribe({
            next: (x) => { o.count = x; this.totvoti += o.count, console.log() },
            error: (e) => console.error(e),
            complete: () => console.log()
          });
        });
      },
      error: (e) => console.error(e),
      complete: () => console.log()
    });

    //carica voto se effettuato in precedenza
    const username = sessionStorage.getItem('username')!;

    this._utenteSondaggioService.canVoto(this.id_sondaggio, username).subscribe({
      next: (can) => {

        //if false vuol dire che ha gia votato e quindi carico il suo voto
        console.log("Ha votato: " + can);

        for (let i = 0; i < this.listaOpzioni.length; i++)
          if (this.listaOpzioni[i].id == can) {

            this.listaOpzioni[i].isAlreadyScelta = true;

          }

        if (can != 0)
          this.hasVotato = true;

      },
      error: (e) => console.error(e),
      complete: () => console.log("completeSondaggio!")
    });



    //Utente di ADMIN
    this.ruolo = sessionStorage.getItem('ruolo');

  }

  votoForm = new FormGroup({
    opt: new FormControl()
  });

  opzione = new Opzione();
  hasVotato: boolean = false;

  Vota(): void {
    //Id-Sondaggio già presente dall'init ma non lo devo passare
    //Id-Utente lo prendo dalla session
    //Id-Opzione


    this.id_opzione = this.votoForm.get('opt')?.value;
    console.log(this.id_opzione);

    if (!this.hasVotato) {
      console.log("====INSERISCI VOTO====");

      this._utenteSondaggioService.insertVoto(this.id_opzione).subscribe({
        next: () => console.log("Voto inserito"),
        error: (e) => console.error(e),
        complete: () => {
          this.hasVotato = true;
        }
      });
    } else {
      console.log("====MODIFICA VOTO====");

      const username = sessionStorage.getItem('username')!;
      this._utenteSondaggioService.updateVoto(this.id_opzione, username).subscribe({
        next: () => console.log("Voto aggiornato"),
        error: (e) => console.error(e),
        complete: () => {
        }
      });
    }
    window.location.reload();

  }

  WhatsApp(): void {
    window.open("https://api.whatsapp.com/send?text=" + this.frontendBaseURL + "/%23/vota/" + this.id_sondaggio, '_blank');
  }
  Telegram(): void {
    window.open("https://t.me/share/url?url=Vota Anche Tu&text=" + this.frontendBaseURL + "/%23/vota/" + this.id_sondaggio, '_blank');
  }
  Copy(): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.frontendBaseURL + "/%23/vota/" + this.id_sondaggio;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

  }
}
