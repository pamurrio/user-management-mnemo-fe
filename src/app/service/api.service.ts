import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {User} from "../model/user.model";
import {Observable} from "rxjs/index";
import {ApiResponse} from "../model/api.response";
import { ApiPageUserResponse } from '../model/api.page.user.response';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:1197/api/abm/';



  getUserById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl+ 'users/findById/' + id);
  }

  createUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl+ 'users/created', user);
  }

  updateUser(user: User): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl + 'users/update/' + user.id, user);
  }

  deleteUser(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + 'users/delete/' + id);
  }

  findAllGroup(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'groups/findAll');
  }

  findPageAndSortAndFilterUser(param: any): Observable<ApiPageUserResponse> {
    let params = new HttpParams();
    for (let key in param) {
      params = params.set(key, param[key]);
    }
    return this.http.get<ApiPageUserResponse>(this.baseUrl + 'users/pagingfilteringandsorting', {params});
  }
}
