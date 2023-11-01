import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Opzione } from 'src/app/model/opzione';
import { Sondaggio } from 'src/app/model/sondaggio';
import { OpzioneService } from 'src/app/service/opzione.service';
import { SondaggioService } from '../../service/sondaggio.service';

@Component({
  selector: 'app-modifica-sondaggio',
  templateUrl: './modifica-sondaggio.component.html',
  styleUrls: ['./modifica-sondaggio.component.css']
})
export class ModificaSondaggioComponent implements OnInit {
  id_sondaggio!: number;
  s: Sondaggio = new Sondaggio;

  listaOpzioni: Opzione[] = [];
  count: number = 0;

  opzioniForm = new FormGroup({
    domanda: new FormControl(),
    descrizione: new FormControl(this.s.descrizione, {initialValueIsDefault: true}),
    aggiungiOpzione: new FormControl()
  });

  

  constructor(private _sondaggioService: SondaggioService,
    private _opzioneService: OpzioneService,
    private _Activatedroute: ActivatedRoute,
    private _router: Router) { }

  ngOnInit(): void {
    

    this._Activatedroute.paramMap.subscribe(params => {
      this.id_sondaggio = Number(params.get('id'));
    });

    //recupero il sondaggio
    this._sondaggioService.getSondaggio(this.id_sondaggio).subscribe({
      next: (x) => this.s = x,
      error: (e) => console.error(e),
      complete: () => console.log("Sondaggio recuperato " + this.s.id)
    });

    this._opzioneService.getOpzioniSondaggo(this.id_sondaggio).subscribe({
      next: (op) => this.listaOpzioni = op,
      error: (e) => console.error(e),
      complete: () => console.log("Opzioni recuperate " + this.listaOpzioni)
    });
  }

  aggiungiOpzione(): void {

    this.count = this.listaOpzioni.length;
    let opzione = new Opzione();
    opzione.id = this.count;

   
      opzione.descrizione = this.opzioniForm.get('aggiungiOpzione')?.value;
      if (opzione.descrizione != null) {
        if (this.count < 4) {

          this.count++;

          this.opzioniForm.addControl("opzione" + opzione.id, new FormControl());
          this.listaOpzioni.push(opzione);
          this._opzioneService.creaOpzione(opzione.descrizione, this.s.id).subscribe();

          //azzeramento campo input
          this.opzioniForm.get('aggiungiOpzione')?.setValue("");

          let opt = "opzione" + opzione.id;
          this.opzioniForm.get(opt)?.setValue(opzione.descrizione);
        }
      }
    
    this.opzioniForm.get('descrizione')?.setValue(this.s.descrizione);
    this.opzioniForm.get('domanda')?.setValue(this.s.domanda);
  }

  rimuoviOpzione(id: number): void {
    this.count--;
    let i: number = 0;
    while (this.listaOpzioni[i].id != id)
      i++;
    delete this.listaOpzioni[i];
    this._opzioneService.deleteOpzione(id).subscribe();

  }



  modifica() {

    if(this.opzioniForm.get('descrizione')?.value != null)
      this.s.descrizione = this.opzioniForm.get('descrizione')?.value;
    if(this.opzioniForm.get('domanda')?.value != null)
      this.s.domanda = this.opzioniForm.get('domanda')?.value;

    console.log(this.s.descrizione + "----------------- " + this.s.domanda)
    this._sondaggioService.updateSondaggio(this.s).subscribe({
      next: () => {

        console.log("Modifica sondaggio con id " + this.id_sondaggio);

      },
      error: (e) => console.error(e),
      complete: () => this._router.navigate(['/sceltaSondaggi'])

    });
  }



}
