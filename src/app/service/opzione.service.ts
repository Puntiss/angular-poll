import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpzioneService {

  private baseURL = environment.host+environment.portAPI+'/api/opzione';
  constructor(private _http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    withCredentials: true
  };

  //--------------------------------- GET OPZIONI SONDAGGIO ------------------------------
  getOpzioniSondaggo(id: number) {
    console.log("Try to getOpzioniSondaggio")

    return this._http.get(this.baseURL + '/getOpzioniSondaggio/' + id,
      this.httpOptions)
      .pipe(map(response => response),
        catchError(this.errorHandler<any>('getAllSondaggiError')));
  }

  body = new URLSearchParams();

  //--------------------------------- COUNTI VOTI OPZIONE ------------------------------
  countVoti(id: number) {
    console.log("Try to countVoti")

    return this._http.get(this.baseURL + '/countVoti/' + id,
      this.httpOptions)
      .pipe(map(response => response),
        catchError(this.errorHandler<any>('countVoti()')));
  }

  creaOpzione(descrizione: string, id: number) {

    this.body.set('sondaggio', String(id));
    this.body.set('descrizione', descrizione);

    return this._http.post(this.baseURL + '/insertOpzione/',
      this.body.toString(),
      this.httpOptions)
      .pipe(map(response => response),
        catchError(this.errorHandler<any>('getSondaggio')));
  }

  private errorHandler<T>(operation = 'Operazione getAllSondaggi', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  deleteOpzione( id: number){
    return this._http.delete(this.baseURL + '/deleteOpzione/' + id,
      this.httpOptions)
      .pipe(map(response => response),
        catchError(this.errorHandler<any>('getSondaggio')));
  }
}
