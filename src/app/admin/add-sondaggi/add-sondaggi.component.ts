import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Opzione } from 'src/app/model/opzione';
import { Sondaggio } from 'src/app/model/sondaggio';
import { OpzioneService } from 'src/app/service/opzione.service';
import { SondaggioService } from 'src/app/service/sondaggio.service';

@Component({
  selector: 'app-add-sondaggi',
  templateUrl: './add-sondaggi.component.html',
  styleUrls: ['./add-sondaggi.component.css']
})
export class AddSondaggiComponent implements OnInit {
  private _opzioneServiceService: any;

  constructor(
    private _sondaggioService: SondaggioService,
    private _opzioneService: OpzioneService,
    private _router: Router) { }

  listaOpzioni: Opzione[] = [];
  count: number = 0;

  opzioniForm = new FormGroup({
    domanda: new FormControl(),
    descrizione: new FormControl(),
    aggiungiOpzione: new FormControl()
  });

  ngOnInit(): void {

  }

  aggiungiOpzione(): void {

    let opzione = new Opzione();
    opzione.id = this.count;

    if (this.count == 3) 
      this.opzioniForm.get('aggiungiOpzione')?.disable();
          
  

    opzione.descrizione = this.opzioniForm.get('aggiungiOpzione')?.value;
    if (opzione.descrizione != null) {
      if (this.count < 4) {

        this.count++;

        this.opzioniForm.addControl("opzione" + opzione.id, new FormControl());
        this.listaOpzioni.push(opzione);

        //azzeramento campo input
        this.opzioniForm.get('aggiungiOpzione')?.setValue("");

        let opt = "opzione" + opzione.id;
        this.opzioniForm.get(opt)?.setValue(opzione.descrizione);


      }



    }
  }

  rimuoviOpzione(id: number): void {
    this.count--;
    for (let i = id; i < this.count; i++)
      this.listaOpzioni[i].descrizione = this.listaOpzioni[i + 1].descrizione;

    this.listaOpzioni.pop();

    this.opzioniForm.get('aggiungiOpzione')?.enable();
  }

  valuechange(event: Event, id: number) {
    let opzione = "opzione" + id;
    this.listaOpzioni[id].descrizione = this.opzioniForm.get(opzione)?.value;
  }

  id_sondaggio_creato!: number;

  creaSondaggio() {
    //creazione sondaggio 
    //ritorna l'id del sondaggio creato
    let sondaggio = new Sondaggio();
    sondaggio.descrizione = this.opzioniForm.get('descrizione')?.value;
    sondaggio.domanda = this.opzioniForm.get('domanda')?.value;
    this._sondaggioService.creaSondaggio(sondaggio).subscribe({
      next: (risultato) => {

        this.id_sondaggio_creato = risultato.data

        //creazione opzioni
        console.log("Creato sondaggio con id= " + this.id_sondaggio_creato);

        this.listaOpzioni.forEach(opzione => {
          this._opzioneService.creaOpzione(opzione.descrizione, this.id_sondaggio_creato).subscribe();
        });

        sessionStorage.setItem('alert','Poll added!');
      },
      error: (e) => console.error(e),
      complete: () => this._router.navigate(['/sceltaSondaggi'])
      

    });

  }
}
