import {Routes} from '@angular/router';
import {HomePageComponent} from "../pages/home-page/home-page.component";
import {NotFoundPageComponent} from "../pages/not-found-page/not-found-page.component";
import {SignInPageComponent} from 'src/pages/auth/sign-in-page/sign-in-page.component';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},

  {path: 'home', component: HomePageComponent},
  {path: 'sign-in', title: 'Авторизация', component: SignInPageComponent},

  {
    path: 'dev',
    children: [

    ]
  },

  {path: '**', title: 'Страница не найдена!', component: NotFoundPageComponent}
];
