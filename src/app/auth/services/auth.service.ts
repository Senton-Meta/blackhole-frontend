import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, shareReplay, tap, throwError} from "rxjs";
import {User} from "../../../entities/user";
import {Router} from "@angular/router";
import {StorageService} from "../../_services/storage.service";
import {Role} from "../../../entities/role";

export interface AuthResponseData {
  id: number,
  email: string,
  roles: string[],
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:3000/';
  AuthenticatedUser$ = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router
  ) {
  }

  login(email: string, password: string) {
    return this.http.request<AuthResponseData>('post', this.url + 'authentication/sign-in',
      {
        body: {email, password},
        withCredentials: true
      })
      .pipe(
        catchError(err => {
          console.log(err);
          let errorMessage = 'An unknown error occurred!';
          if (err.error.message === 'Bad credentials') {
            errorMessage = 'The email address or password you entered is invalid'
          }
          return throwError(() => new Error(errorMessage))
        }),
        tap(
          user => {
            const extractedUser: User = {
              email: user.email,
              id: user.id,
              roles: user.roles.map(role => {
                return {
                  id: parseInt(role[0]),
                  name: role[1],
                  level: parseInt(role[2]),
                } as Role
              })
            }
            this.storageService.saveUser(extractedUser);
            this.AuthenticatedUser$.next(extractedUser);
          }
        )
      );
  }

  autoLogin() {
    const userData = this.storageService.getSavedUser();
    if (!userData) {
      return;
    }
    this.AuthenticatedUser$.next(userData);
  }

  logout() {
    this.http.request('post', this.url + 'authentication/logout', {
      withCredentials: true
    }).subscribe({
      next: () => {
        this.storageService.clean();
        this.AuthenticatedUser$.next(null);
        this.router.navigate(['/login']);
      }
    })

  }

  refreshToken() {
    return this.http.request('post', this.url + 'authentication/refresh-token', {
      withCredentials: true
    })
  }


}
