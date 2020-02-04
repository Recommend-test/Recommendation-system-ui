import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit,OnChanges {


 
  starWidth:number;
  @Input() rating:number=4;

  @Output() notify: EventEmitter<string>=new EventEmitter<string>(); 

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(): void {
    this.starWidth=this.rating*75/5;
  }

  fireEvent(){
    this.notify.emit("Start Clicked");
  }
}
