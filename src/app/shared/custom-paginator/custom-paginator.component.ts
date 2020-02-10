import { Component , Input , OnChanges , Output , EventEmitter} from '@angular/core';  
  
@Component({
  selector: 'custom-paginator',
  templateUrl: './custom-paginator.component.html',
  styleUrls: ['./custom-paginator.component.css']
}) 
export class CustomPaginatorComponent {  
    @Input() totalRecords: number = 0;  
    @Input() recordsPerPage: number = 0;  
  
    @Output() onPageChange: EventEmitter<number> = new EventEmitter();  
    dsiabledProperty: string = 'disabled';
    enabledProperty: string = 'page-item';
   
    
    activePage:number=1;  
    onClickPage(pageNumber:number){  
        if(pageNumber < 1) return;
        
        this.activePage = pageNumber;  
        this.onPageChange.emit(this.activePage);  
    }  
}  
