import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductService } from '../services/productservice.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductManipulationComponent } from './product-manipulation/product-manipulation.component';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductManipulationComponent

  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [ProductService]
})
export class ProductModule { }
