import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtentesondaggioService {

  private baseURL = environment.host + environment.portAPI + '/api/utenteSondaggio';
  private frontendBaseURL = environment.host + environment.portFE;
  constructor(private _http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': this.frontendBaseURL,
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    withCredentials: true
  };

  insertVoto(id_opzione: number): Observable<any> {
    return this._http.post(this.baseURL + '/insertVoto/' + id_opzione, "",
      this.httpOptions
    )
      .pipe(map(response => response), catchError(this.ErrorHandler<any>('InsertVotoError')));
  }

  updateVoto(id_opzione: number, username: string): Observable<any> {
    return this._http.put(this.baseURL + '/updateVoto/' + id_opzione + '/' + username, "",
      this.httpOptions
    )
      .pipe(map(response => response), catchError(this.ErrorHandler<any>('UpdateVotoError')));
  }

  canVoto(id_sondaggio: number, username: string): Observable<any> {
    return this._http.get(this.baseURL + '/canVoto/' + id_sondaggio + '/' + username,
      this.httpOptions
    )
      .pipe(map(response => response
      ), catchError(this.ErrorHandler<any>('CanVotoError')));
  }

  private ErrorHandler<T>(operation = 'Operazione', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

}
