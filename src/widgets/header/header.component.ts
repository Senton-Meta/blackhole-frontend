import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../app/auth/services/auth.service";
import {BehaviorSubject} from "rxjs";
import {User} from "../../entities/user";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  AuthenticatedUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.AuthenticatedUser$ = this.authService.AuthenticatedUser$;
  }

  signOut() {
    this.authService.logout()
  }
}
