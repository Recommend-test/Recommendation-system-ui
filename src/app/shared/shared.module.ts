import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConvertToSpacePipe } from './ConvertToSpacePipe';

import { CustomPaginatorComponent } from './custom-paginator/custom-paginator.component';
import { ErrorMessageComponent } from './error-message/error-message.component';



@NgModule({
  declarations: [
    ConvertToSpacePipe,
    CustomPaginatorComponent,
    ErrorMessageComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CommonModule,
    FormsModule,
    ConvertToSpacePipe,
    CustomPaginatorComponent,
    ErrorMessageComponent
  ]
})
export class SharedModule { }
