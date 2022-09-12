import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./customer-pages/customer-pages-routing.module').then(m => m.CustomerPagesRoutingModule),
  },
  {
    path: '',
    loadChildren: () => import('./admin-pages/admin-pages-routing.module').then(m => m.AdminPagesRoutingModule),
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
