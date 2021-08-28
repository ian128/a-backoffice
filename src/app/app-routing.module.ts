import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './start/start.component';

const routes: Routes = [
  {
    path: "employee", loadChildren: ()=> import('./employee/employee.module').then(res => res.EmployeeModule)
  },
  {
    path: "start", component: StartComponent
  },
  {
    path: "auth", loadChildren: ()=> import('./auth/auth.module').then(res => res.AuthModule)
  },
  {
    path: "**", redirectTo: "start", pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
