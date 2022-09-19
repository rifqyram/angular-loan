import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  @Input() width: number = 24;
  @Input() height: number = 24;

  constructor() { }

  ngOnInit(): void {
  }

}
