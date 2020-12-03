import { environment } from './../../environments/environment.prod';
import { Logs } from '../models/logs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  // private baseUrl = 'http://localhost:8085/';
  // private url = this.baseUrl + 'api/logs';
  baseUrl = environment.baseUrl;
  url = this.baseUrl + 'api/logs';
  datePipe: any;

  index(): Observable<Logs[]> {
    return this.http.get<Logs[]>(this.url)
    .pipe(
      catchError((err:any) => {
        console.log(err);
        return throwError('LogsService.index(): List not found.');
      })
    );
  }
  constructor(private http: HttpClient) { }

  showLog(logId): Observable<Logs> {

    return this.http.get<Logs>(`${this.url}/${logId}`).pipe(
      catchError((err:any)=>{
        console.log(err);
        return throwError('LogsService.show(): Error retrieving log' + logId)
      })
    );
  }
  create(log: Logs): Observable<Logs>{
    const httpOptions = {
      headers: {
        'Content-type': 'application/json'
      }
    };
    return this.http.post<Logs>(this.url, log).pipe(
      catchError((err:any)=>{
      console.log(err);
      return throwError('LogsService.create(): Error creating Log.')
      })
    );
  }

  update(log: Logs): Observable<Logs>{
    const httpOptions = {
      headers: {
        'Content-type': 'application/json'
      }
    };
    return this.http.put<Logs>(`${this.url}/${log.id}`, log).pipe(
      catchError((err:any)=>{
      console.log(err);
      return throwError('LogsService.update(): Error updating Log.')
      })
    );
}

  destroy(id: Number): Observable<boolean>{
   return this.http.delete<boolean>(`${this.url}/${id}`).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('LogsService.destory(): Error deleting Log.');
      })
    );
  }
}
