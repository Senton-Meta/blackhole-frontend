import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../../entities/user";
import {shareReplay} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<User>('http://localhost:3000/authentication/sign-in', {email, password}).pipe(
      shareReplay()
    );
  }
}
