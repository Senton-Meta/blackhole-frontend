import {APP_ID, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const API_URL = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }


  getUserPublicContent() {
    return  this.http.request('post','http://localhost:3000/users', {
      withCredentials: true,
      responseType : "text"
    })
  }
}
