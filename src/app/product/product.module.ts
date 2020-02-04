import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { StarsComponent } from '../shared/stars/stars.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { EditProductComponent } from './edit-product/edit-product.component';
// Imports for loading & configuring the in-memory web api

import { ProductData } from './ProductData';




@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    EditProductComponent
   
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ProductModule { }
