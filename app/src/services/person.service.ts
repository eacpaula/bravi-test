import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Person } from './person';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PersonService {

  baseurl = environment.apiAddress;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  Create(data): Observable<Person> {
    return this.http.post<Person>(`${this.baseurl}/person/`, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  Get(id): Observable<Person> {
    return this.http.get<Person>(`${this.baseurl}/person/` + id)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  GetAll(text: string = null): Observable<Person> {
    const filter = text ? `firstname__regex=/${text}/i` : null;

    return this.http.get<Person>(`${this.baseurl}/person?sort=-createdAt&${filter}`)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  Update(id, data): Observable<Person> {
    return this.http.put<Person>(`${this.baseurl}/person/` + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  Delete(id) {
    return this.http.delete<Person>(`${this.baseurl}/person/` + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  errorHandl(error) {
     let errorMessage = '';
     if (error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }
}
