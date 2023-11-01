import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  private baseURL = environment.host + environment.portAPI + '/api/utente';
  private frontendBaseURL = environment.host + environment.portFE;
  constructor(private _http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': this.frontendBaseURL,
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    withCredentials: true
  };

  body = new URLSearchParams();

  login(username: string, password: string): Observable<any> {

    console.log("Try to login with: " + username + " " + password)

    this.body.set('username', username);
    this.body.set('password', password);
    return this._http.post(this.baseURL + '/login/',
      this.body.toString(),
      this.httpOptions,
    ).pipe(
      map(response => response),
      catchError(this.errorHandler<any>('LoginError')));
  }

  registra(username: string, password: string, email: string): Observable<any> {
    this.body.set('username', username);
    this.body.set('password', password);
    this.body.set('email', email);

    return this._http.post(this.baseURL + '/registra', this.body.toString(), this.httpOptions).pipe(
      map(response => response),
      catchError(this.errorHandler<any>('Create Utente'))
    );
  }

  logout(): Observable<any> {

    console.log("Try to logout")

    return this._http.get(this.baseURL + '/logout/',
      this.httpOptions)
      .pipe(map(response => response),
        catchError(this.errorHandler<any>('LogoutError')));
  }

  private errorHandler<T>(operation = 'Operazione', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

}
