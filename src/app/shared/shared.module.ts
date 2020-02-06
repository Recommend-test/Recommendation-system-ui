import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConvertToSpacePipe } from './ConvertToSpacePipe';
import { PaginatorComponent } from './paginator/paginator.component';



@NgModule({
  declarations: [
    ConvertToSpacePipe,
    PaginatorComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CommonModule,
    FormsModule,
    ConvertToSpacePipe,
    PaginatorComponent
  ]
})
export class SharedModule { }
