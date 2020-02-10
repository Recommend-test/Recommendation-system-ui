import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConvertToSpacePipe } from './ConvertToSpacePipe';

import { CustomPaginatorComponent } from './custom-paginator/custom-paginator.component';



@NgModule({
  declarations: [
    ConvertToSpacePipe,
    CustomPaginatorComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CommonModule,
    FormsModule,
    ConvertToSpacePipe,
    CustomPaginatorComponent
  ]
})
export class SharedModule { }
