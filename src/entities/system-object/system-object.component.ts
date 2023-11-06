import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-system-object',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './system-object.component.html',
  styleUrls: ['./system-object.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SystemObjectComponent {
  @Input() coordinates: {
    x: number,
    y: number,
  } = {
    x: 0,
    y: 0,
  };

}
