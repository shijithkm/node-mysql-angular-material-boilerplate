import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = environment.serviceBaseUrl + 'users';  // URL to web api

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        catchError(this.handleError('getUsers', []))
      );
  }

  addUser(obj): Observable<any> {
    return this.http.post<any>(this.usersUrl, obj)
      .pipe(
        catchError(this.handleError('addUsers', []))
      );
  }

  editUser(obj): Observable<any> {
    return this.http.put<any>(this.usersUrl + '/' + obj.id, obj)
      .pipe(
        catchError(this.handleError('EditUsers', []))
      );
  }

  deleteUsers(obj): Observable<any> {
    return this.http.delete<any>(this.usersUrl + '/' + obj)
      .pipe(
        catchError(this.handleError('DeleteUsers', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
