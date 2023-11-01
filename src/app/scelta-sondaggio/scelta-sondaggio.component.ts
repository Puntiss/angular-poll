import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Opzione } from '../model/opzione';
import { Sondaggio } from '../model/sondaggio';
import { OpzioneService } from '../service/opzione.service';
import { SondaggioService } from '../service/sondaggio.service';
import { UtentesondaggioService } from '../service/utentesondaggio.service';

@Component({
  selector: 'app-scelta-sondaggio',
  templateUrl: './scelta-sondaggio.component.html',
  styleUrls: ['./scelta-sondaggio.component.css']
})
export class SceltaSondaggioComponent implements OnInit {
  s: Sondaggio[] = [];
  ruolo: any;
  id_sondaggio!: number;
  id_opzione!: number;
  listaOpzioni: Opzione[] = [];
  totvoti!: number;

  alert!: string | null;

  constructor(private _Activatedroute: ActivatedRoute,
    private _sondaggioService: SondaggioService,
    private _opzioneService: OpzioneService,
    private _utenteSondaggioService: UtentesondaggioService) { }

  ngOnInit(): void {
    this._sondaggioService.getAllSondaggi().subscribe({
      next: (x) => {
        this.s = x;
        //controllo se in ogni sondaggio l'utente ha gia votato  

        this.s.forEach(sondaggio => {
          sondaggio.hasVotato = false;

          const username = sessionStorage.getItem('username')!;

          this._utenteSondaggioService.canVoto(sondaggio.id, username).subscribe({
            next: (can) => {
              if (can != 0)
                sondaggio.hasVotato = true;

            },
            error: (e) => console.error(e),
            complete: () => console.log()
          });


        });

      },
      error: (e) => console.error(e),
      complete: () => console.log("completeLoadSondaggi!")
    });

    this.ruolo = sessionStorage.getItem('ruolo');
    console.log("ROLE = " + this.ruolo);

    this._Activatedroute.paramMap.subscribe(params => {
      this.alert = sessionStorage.getItem('alert');
    });
  }

  rimuovi(id_sondaggio: number): void {
    this.id_sondaggio = id_sondaggio;
    console.log("id sondaggio " + this.id_sondaggio)

    //ottengo le opzioni e le elimino
    /*this._opzioneService.getOpzioniSondaggo(this.id_sondaggio).subscribe({
      next: (opzioni) => {
        this.listaOpzioni = opzioni;
        this.listaOpzioni.forEach(o => {
          this._opzioneService.deleteOpzione(o.id).subscribe({
            next: () => console.log("opzione eliminata" + o.count),
            error: (e) => console.error(e),
            complete: () => console.log("completeEliminaOpzioni! - Fase 1 del rimuovi sondaggio")
          });
        });
      },
      error: (e) => console.error(e),
      complete: () => console.log("completeAllOpzioni!")
    });*/

    this._sondaggioService.rimuoviSondaggio(this.id_sondaggio).subscribe({
      next: () => console.log("Sondaggio eliminato"),
      error: (e) => console.error(e),
      complete: () => console.log("complete! - fase 2 della rimozione del sondaggio")
    });

    sessionStorage.setItem('alert', 'Poll deleted!');
    window.location.reload();
  }
}
