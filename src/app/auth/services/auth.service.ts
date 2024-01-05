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
  url = 'http://localhost:3000/api/v1/';
  AuthenticatedUser$ = new BehaviorSubject<User | null>(null);

  constructor(
    private readonly http: HttpClient,
    private readonly storageService: StorageService,
    private readonly router: Router,
    private readonly jwtHelper: JwtHelperService
  ) {
  }

  login(email: string, password: string) {
    const body = { email, password };

    return this.http.post(this.url + 'authentication/sign-in', body, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
      .pipe(
        catchError(err => {
          console.log(err);
          let errorMessage = 'An unknown error occurred!';
          if (err.error.message === 'Bad credentials') {
            errorMessage = 'The email address or password you entered is invalid';
          }
          return throwError(() => new Error(errorMessage));
        }),
        tap((response: any) => {

          this.AuthenticatedUser$.next(response.userData as User);
          this.storageService.saveRefreshToken(response.refreshToken);
        })
      );
  }

  autoLogin() {
    console.log('--------------- AUTO LOGIN')

    const refreshToken = this.storageService.getRefreshToken();
    if (!refreshToken) {
      return;
    }

    this.refreshToken()
    // this.AuthenticatedUser$.next(userData);
  }

  logout() {
    this.http.request('get', this.url + 'authentication/signout', {
      withCredentials: true
    }).subscribe({
      next: () => {
        this.storageService.clean();
        this.AuthenticatedUser$.next(null);
        this.router.navigate(['/sign-in']);
      }
    })

  }

  refreshToken() {
    return this.http.request('post', this.url + 'authentication/refresh-token', {
      withCredentials: true
    })
  }
}
