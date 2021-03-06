import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserActionComponent } from './user-action/user-action.component';
import { UserActionManipulationComponent } from './user-action-manipulation/user-action-manipulation.component';

@NgModule({
  declarations: [UserActionComponent, UserActionManipulationComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports:[
    UserActionComponent
  ]
})
export class ConfigurationModule { }
