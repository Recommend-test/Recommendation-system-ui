import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductListComponent } from "./product/product-list/product-list.component";
import { ProductDetailComponent } from "./product/product-detail/product-detail.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { ProductdetailGuardGuard } from "./product/product-list/productdetail-guard.guard";
import { EditProductComponent } from "./product/edit-product/edit-product.component";
import { EditProductGuardGuard } from "./product/edit-product/guard/edit-product-guard.guard";
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryManipulationComponent } from './category/category-manipulation/category-manipulation.component';
import { CategoryManipulationGuard } from './category/guard/category-manipulation.guard';

const routes: Routes = [
  { path: "products", component: ProductListComponent },
  {
    path: "productsDetails/:id",
    canActivate: [ProductdetailGuardGuard],
    component: ProductDetailComponent
  },
  {
    path: "product/:id/edit",
    component: EditProductComponent,
    canDeactivate: [EditProductGuardGuard]
  },
  { path: "categories", component: CategoryListComponent },
  { path: "categories/:id", component: CategoryManipulationComponent,canDeactivate:[CategoryManipulationGuard] },
  { path: "welcome", component: WelcomeComponent },
  { path: "", redirectTo: "welcome", pathMatch: "full" },
  { path: "**", redirectTo: "welcome", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
