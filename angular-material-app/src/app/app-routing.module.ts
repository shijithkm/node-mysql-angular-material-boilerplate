import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatNavComponent } from './mat-nav/mat-nav.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MatNavComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: './modules/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'users',
        loadChildren: './modules/users/users.module#UsersModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
