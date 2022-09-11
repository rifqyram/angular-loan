import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  collapsed: boolean = false;

  onToggleSidenav(collapsed: boolean): void {
    this.collapsed = collapsed;
  }

}
