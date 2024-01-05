import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {AuthService} from "../../../app/auth/services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInPageComponent implements OnInit {
  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['test2@aaa.com', Validators.required],
      password: ['Password!123', Validators.required]
    });
  }

  signIn() {
    const val = this.form.value;
    console.log(val.email, val.password)

    if (val.email && val.password) {
      this.authService.login(val.email, val.password)
        .subscribe(
          () => {
            console.log("User is logged in");
            this.router.navigateByUrl('/');
          }
        );
    }
  }
}
