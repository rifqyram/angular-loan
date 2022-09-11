import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './components/footer/footer.component';
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TooltipDirective} from './directives/tooltip.directive';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    FooterComponent,
    TooltipDirective,
    SidenavComponent,
    LoadingComponent,
  ],
  exports: [
    FooterComponent,
    TooltipDirective,
    SidenavComponent,
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
  ],
})
export class SharedModule {
}
