import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarsComponent } from './stars/stars.component';
import { FormsModule } from '@angular/forms';
import { ConvertToSpacePipe } from './ConvertToSpacePipe';
import { PaginatorComponent } from './paginator/paginator.component';



@NgModule({
  declarations: [
    StarsComponent,
    ConvertToSpacePipe,
    PaginatorComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    StarsComponent,
    CommonModule,
    FormsModule,
    ConvertToSpacePipe,
    PaginatorComponent
  ]
})
export class SharedModule { }
