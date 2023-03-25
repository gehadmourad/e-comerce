import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './admin-view/add/add-category/add-category.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { EditCategoryComponent } from './admin-view/edit/edit-category/edit-category.component';
import { LoginComponent } from './login/login.component';
import { UserViewComponent } from './user-view/user-view.component';
import { UserAuthGuard } from '../app/shared/helper/auth.guard';
import { ForbiddenPageComponent } from '../app/shared/component/ForbiddenPage/forbidden-page.component';

const routes: Routes = [];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    useHash: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const AppRoutes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'adminview', component: AdminViewComponent ,canActivate: [UserAuthGuard]},
  { path: 'userview', component: UserViewComponent ,canActivate: [UserAuthGuard]},
  { path: 'AddCategory', component: AddCategoryComponent,canActivate: [UserAuthGuard] },
  { path: 'EditCategory/:id', component: EditCategoryComponent ,canActivate: [UserAuthGuard]},
  { path: 'forbiddenPage', component: ForbiddenPageComponent },

  

  
  
  


]