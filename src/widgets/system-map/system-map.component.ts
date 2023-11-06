import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SystemObjectComponent} from "../../entities/system-object/system-object.component";

@Component({
  selector: 'app-system-map',
  standalone: true,
  imports: [CommonModule, SystemObjectComponent],
  templateUrl: './system-map.component.html',
  styleUrls: ['./system-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SystemMapComponent {
  getRandomCoordinate(): {x: number, y: number} {
    let x =  Math.random() * (94 - 2) + 2;
    let y =  Math.random() * (88 - 2) + 2;

    return {
      x: x,
      y: y,
    }
  }
}
