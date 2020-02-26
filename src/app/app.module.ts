import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { HttpClientModule } from "@angular/common/http";

import { WelcomeComponent } from "./welcome/welcome.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ProductModule } from "./product/product.module";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CategoryModule} from "./category/category.module"
import { CategoryService } from './services/category.service';
import { ConfigurationModule } from "./configuration/configuration.module";


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UserActionService } from './services/userAction.service';


@NgModule({
  declarations: [AppComponent, WelcomeComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ProductModule,
    ReactiveFormsModule,
    CategoryModule,
    ConfigurationModule,
    NgbModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
