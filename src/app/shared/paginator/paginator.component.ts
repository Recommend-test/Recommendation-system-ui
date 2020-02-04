import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Input() previousBtn: string = 'disabled';
  @Input() nextBtn: string = 'page-item';

  @Output() previousE: EventEmitter<any> = new EventEmitter();
  @Output() nextE: EventEmitter<any> = new EventEmitter();

  
  constructor() { }

  ngOnInit() {
   
  }

  previous(){
   this.previousE.emit();
  }

  next(){
    this.nextE.emit();
  }

}
