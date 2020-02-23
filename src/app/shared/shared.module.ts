import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConvertToSpacePipe } from './ConvertToSpacePipe';

import { CustomPaginatorComponent } from './custom-paginator/custom-paginator.component';
import { ErrorMessageComponent } from './error-message/error-message.component';

import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
    ConvertToSpacePipe,
    CustomPaginatorComponent,
    ErrorMessageComponent
  ],
  imports: [
    CommonModule,
    AutocompleteLibModule,
    NgbModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ConvertToSpacePipe,
    CustomPaginatorComponent,
    ErrorMessageComponent
  ]
})
export class SharedModule { }
