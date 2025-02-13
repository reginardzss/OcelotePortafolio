import { Component } from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HeroComponent } from './hero/hero.component';

@Component({
  selector: 'main-component',
  imports: [NavBarComponent,HeroComponent],
  templateUrl: './main-component.component.html',
})
export class MainComponent {

}
