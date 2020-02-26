import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductListComponent } from "./product/product-list/product-list.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryManipulationComponent } from './category/category-manipulation/category-manipulation.component';
import { CategoryManipulationGuard } from './category/guard/category-manipulation.guard';
import { UserActionComponent } from './configuration/user-action/user-action.component';
import { UserActionManipulationComponent } from './configuration/user-action-manipulation/user-action-manipulation.component';
import { UserActionManipulationGuard } from './configuration/guard/user-action-manipulation.guard';

const routes: Routes = [
  { path: "products", component: ProductListComponent },
  { path: "categories", component: CategoryListComponent },
  { path: "categories/:id", component: CategoryManipulationComponent, canDeactivate: [CategoryManipulationGuard] },
  { path: "configuration", component: UserActionComponent },
  { path: "configuration/:id", component: UserActionManipulationComponent, canDeactivate: [UserActionManipulationGuard] },
  { path: "welcome", component: WelcomeComponent },
  { path: "", redirectTo: "welcome", pathMatch: "full" },
  { path: "**", redirectTo: "welcome", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
