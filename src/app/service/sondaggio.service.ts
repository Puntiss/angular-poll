import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Sondaggio } from '../model/sondaggio';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SondaggioService {

  private baseURL = environment.host+environment.portAPI+'/api/sondaggio';
  constructor(private _http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    withCredentials: true
  };

  /*body = new URLSearchParams();*/

  getAllSondaggi(): Observable<any> {

    console.log("Try to getAllSondaggi")

    return this._http.get(this.baseURL + '/sondaggi/',
      this.httpOptions)
      .pipe(map(response => response),
        catchError(this.errorHandler<any>('getAllSondaggiError')));
  }

  getSondaggio(id: number) {
    return this._http.get(this.baseURL + '/sondaggio/' + id,
      this.httpOptions)
      .pipe(map(response => response),
        catchError(this.errorHandler<any>('getSondaggio')));
  }

  body = new URLSearchParams();

  creaSondaggio(sondaggio:Sondaggio) {

    this.body.set('domanda', sondaggio.domanda);
    this.body.set('descrizione', sondaggio.descrizione);

    return this._http.post(this.baseURL + '/insertSondaggio/',
      this.body.toString(),
      this.httpOptions)
      .pipe(map(response => response),
        catchError(this.errorHandler<any>('insertSondaggio')));
  }

  private errorHandler<T>(operation = 'Operazione getAllSondaggi', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  rimuoviSondaggio(id:number) {
    return this._http.delete(this.baseURL + '/deleteSondaggio/' + id,
      this.httpOptions)
      .pipe(map(response => response),
        catchError(this.errorHandler<any>('deleteSondaggio')));
  }

  updateSondaggio(sondaggio:Sondaggio) {
    console.log(sondaggio.descrizione + "--------Servi--------- " + sondaggio.domanda)
    this.body.set('domanda', sondaggio.domanda);
    this.body.set('descrizione', sondaggio.descrizione);
    this.body.set('id', ""+sondaggio.id);

    return this._http.post(this.baseURL + '/updateSondaggio/',
      this.body.toString(),
      this.httpOptions)
      .pipe(map(response => response),
        catchError(this.errorHandler<any>('updateSondaggio')));
  }



}
