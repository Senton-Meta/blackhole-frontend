import {Routes} from '@angular/router';
import {HomePageComponent} from "../pages/home-page/home-page.component";
import {NotFoundPageComponent} from "../pages/not-found-page/not-found-page.component";
import {SignInPageComponent} from 'src/pages/auth/sign-in-page/sign-in-page.component';
import {authGuard} from "./auth/guards/auth.guard";
import {AdminComponent} from "../pages/admin/admin.component";
import {ProfilePageComponent} from "../pages/profile-page/profile-page.component";
import {SandboxPageComponent} from "../pages/sandbox-page/sandbox-page.component";

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},

  {path: 'home', component: HomePageComponent, canActivate: [authGuard]},
  {path: 'sign-in', title: 'Авторизация', component: SignInPageComponent},

  { path: 'profile', component: ProfilePageComponent, canMatch: [authGuard]},
  { path: 'admin', component: AdminComponent, canMatch: [authGuard]},

  { path: 'sandbox', component: SandboxPageComponent, canMatch: [authGuard] },

  {path: '**', title: 'Страница не найдена!', component: NotFoundPageComponent}
];
