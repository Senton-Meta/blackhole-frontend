import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from "../../app/auth/services/auth.service";
import {BehaviorSubject} from "rxjs";
import {User} from "../../entities/user";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePageComponent implements OnInit {
  AuthenticatedUser$ = new BehaviorSubject<User | null>(null);

  constructor(
    private readonly authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.AuthenticatedUser$.next(this.authService.AuthenticatedUser$.value)
  }
}
