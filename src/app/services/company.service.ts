import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {api} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    })
  };

  constructor(private http: HttpClient) { }

  /**
   * Récupère toutes les companies
   * @param page number
   * @param column string
   * @param direction string
   * @return Observable<IPaginateResponse<ICompany[]>>
   */
  getCompanies(page: number = 1, column: string, direction: string): Observable<IPaginateResponse<ICompany[]>> {
    const query = `?page=${page}&column=${column}&direction=${direction}`;
    return this.http.get<IPaginateResponse<ICompany[]>>(api.back + '/company' + query, this.httpOptions);
  }

  /**
   * Récupère toutes les companies
   * @param id number
   * @return Observable<IPaginateResponse<ICompany>>
   */
  getCompany(id: number): Observable<ICompany> {
    return this.http.get<ICompany>(api.back + '/company/' + id, this.httpOptions);
  }

  searchCompanie(data): Observable<IPaginateResponse<ICompany[]>> {
    return this.http.post<IPaginateResponse<ICompany[]>>(api.back + '/company/search', data, this.httpOptions);
  }

  getSectorList(): Observable<ISector[]> {
    return this.http.get<ISector[]>(api.back + '/sector', this.httpOptions);
  }
}
