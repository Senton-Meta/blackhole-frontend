import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter, Router} from '@angular/router';

import { routes } from './app.routes';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {HttpRequestInterceptor} from "./interceptors/http-request.interceptor";
import {JwtModule} from "@auth0/angular-jwt";
import {AuthService} from "./auth/services/auth.service";

export function initialize(
  authService: AuthService,
) {

  return async () => {
    authService.autoLogin().subscribe(v => {
      console.log('[app.config.ts]: auto login successfully')
    });
    console.log('[app.config.ts]: app initialized');
  };
}


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initialize,
      deps: [AuthService],
      multi: true
    },
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: () => localStorage.getItem('access_token'), // Функция, чтобы получить токен из хранилища (localStorage, например)
          allowedDomains: ["http://localhost:3000"],
        },
      }),
    ),
    provideHttpClient(
      withInterceptorsFromDi()
    ),
  ]
};
