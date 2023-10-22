import {Routes} from '@angular/router';
import {HomePageComponent} from "../pages/home-page/home-page.component";
import {NotFoundPageComponent} from "../pages/not-found-page/not-found-page.component";
import {SignInPageComponent} from 'src/pages/sign-in-page/sign-in-page.component';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},

  {path: 'home', component: HomePageComponent},

  {
    path: 'dev',
    children: [
      {path: 'sign-in', title: 'Авторизация', component: SignInPageComponent}
    ]
  },

  {path: '**', title: 'Страница не найдена!', component: NotFoundPageComponent}
];
