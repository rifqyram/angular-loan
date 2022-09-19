import {AfterViewChecked, ChangeDetectorRef, Component} from '@angular/core';
import {LoadingService} from "./shared/service/loading.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked{
  collapsed: boolean = false;
  loading: Observable<boolean>
  constructor(private readonly loadingService: LoadingService, private cdRef : ChangeDetectorRef) {
    this.loading = loadingService.loading;
  }

  onToggleSidenav(collapsed: boolean): void {
    this.collapsed = collapsed;
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges()
  }

}
