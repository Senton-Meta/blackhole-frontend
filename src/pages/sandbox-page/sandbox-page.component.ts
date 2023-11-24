import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient} from "@angular/common/http";
import {catchError, first, tap, throwError} from "rxjs";

@Component({
  selector: 'app-sandbox-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sandbox-page.component.html',
  styleUrls: ['./sandbox-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SandboxPageComponent implements OnInit {
  constructor(
    private http: HttpClient,
  ) {
  }

  ngOnInit(): void {
    this.http.request('get', 'http://localhost:3000/api/v1/sandbox', {
      withCredentials: true,
      responseType: "text"
    })
    .subscribe({
      next: (v) => console.log(v),
      error: (e) => console.error('Ошибке', e),
      complete: () => console.info('complete')
    });
  }
}
