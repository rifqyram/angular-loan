import {Component, OnInit} from '@angular/core';
import {InstalmentTypeService} from "../../service/instalment-type.service";
import {InstalmentType} from "../../model/InstalmentType";
import {finalize, switchMap} from "rxjs";

@Component({
  selector: 'app-instalment-type-list',
  templateUrl: './instalment-type-list.component.html',
  styleUrls: ['./instalment-type-list.component.scss']
})
export class InstalmentTypeListComponent implements OnInit {
  instalmentTypes: InstalmentType[] = [];
  loading: boolean = false;
  error: any;

  constructor(private readonly service: InstalmentTypeService) {}

  ngOnInit(): void {
    if (!this.loading) {
      this.getAll()
    }
  }

  getAll(): void {
    this.loading = true;
    this.service.getAll().pipe(finalize(() => this.loading = false)).subscribe({
      next: ({data}) => this.instalmentTypes = data,
      error: (err) => this.error = err
    })
  }

}
