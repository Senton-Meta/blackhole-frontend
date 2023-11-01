import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, shareReplay, tap, throwError} from "rxjs";
import {User} from "../../../entities/user";
import {Router} from "@angular/router";
import {StorageService} from "../../_services/storage.service";
import {Role} from "../../../entities/role";
import {JwtHelperService} from "@auth0/angular-jwt";


interface AuthResponseData {
  accessToken: string;
  refreshToken: string;
  // Другие свойства, если они есть
}

export interface UserResponseData {
  id: number,
  email: string,
  roles: Role[],
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:3000/';
  AuthenticatedUser$ = new BehaviorSubject<User | null>(null);

  constructor(
    private readonly http: HttpClient,
    private readonly storageService: StorageService,
    private readonly router: Router,
    private readonly jwtHelper: JwtHelperService
  ) {
  }

  login(email: string, password: string) {
    return this.http.request<AuthResponseData>('post', this.url + 'authentication/sign-in',
      {
        body: {email, password},
        headers: {
          'Content-Type': 'application/json',
        },
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
        tap((user) => {
          const token = user.accessToken;
          if (token) {
            const decodedToken = this.jwtHelper.decodeToken(token);
            console.log(decodedToken);
            const extractedUser: UserResponseData = {
              email: decodedToken.email,
              id: decodedToken.sub,
              roles: decodedToken.roles
            };
            this.storageService.saveUser(extractedUser);
            this.AuthenticatedUser$.next(extractedUser);
          }
        })
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
