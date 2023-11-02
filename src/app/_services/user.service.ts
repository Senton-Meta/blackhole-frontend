import {APP_ID, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }


  getUserPublicContent() {
    return  this.http.request('post','http://localhost:3000/api/v1/users', {
      withCredentials: true,
      responseType : "text"
    })
  }
}
