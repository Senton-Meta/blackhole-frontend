import {ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {RouterLink} from "@angular/router";
import {SystemMapComponent} from "../../widgets/system-map/system-map.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterLink, SystemMapComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {

}
