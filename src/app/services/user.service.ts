import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {api} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  login(data: string[]): Observable<IToken> {
    return this.http.post<IToken>(api.back + '/login', data, this.httpOptions);
  }
}
