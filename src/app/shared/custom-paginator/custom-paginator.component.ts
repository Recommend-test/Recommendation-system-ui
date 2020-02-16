import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Paginator } from 'src/app/model/Paginator';

@Component({
  selector: 'custom-paginator',
  templateUrl: './custom-paginator.component.html',
  styleUrls: ['./custom-paginator.component.css']
})
export class CustomPaginatorComponent {


  @Input() activePage: number = 1;


  @Input() perPage: number = 0;
 
  @Input() actualTotalRecords: number = 0;


  @Output() onPageChange: EventEmitter<Paginator> = new EventEmitter();
  dsiabledProperty: string = 'disabled';
  enabledProperty: string = 'page-item';



  onClickPage(paginator: Paginator) {
    this.activePage = paginator.page;
    console.log(this.activePage);
    this.onPageChange.emit(paginator);
  }
}  
