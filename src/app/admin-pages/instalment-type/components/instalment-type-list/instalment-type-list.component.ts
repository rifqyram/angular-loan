import {Component, OnInit} from '@angular/core';
import {InstalmentTypeService} from "../../service/instalment-type.service";
import {InstalmentType} from "../../model/InstalmentType";
import {finalize, switchMap} from "rxjs";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-instalment-type-list',
  templateUrl: './instalment-type-list.component.html',
  styleUrls: ['./instalment-type-list.component.scss']
})
export class InstalmentTypeListComponent implements OnInit {
  instalmentTypes: InstalmentType[] = [];
  error: any;

  constructor(private readonly service: InstalmentTypeService,
              private readonly titleService: Title) {
    titleService.setTitle('Enigma Loan | Instalment Type')
  }

  ngOnInit(): void {
      this.getAll()
  }

  getAll(): void {
    this.service.getAll().subscribe({
      next: ({data}) => {
        console.log(data);
        this.instalmentTypes = data
      },
      error: (err) => this.error = err
    })
  }

}
