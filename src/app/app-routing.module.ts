import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuardService } from 'src/guards/login-guard.service';
import { StartComponent } from './start/start.component';

const routes: Routes = [
  {
    path: "employee", loadChildren: ()=> import('./employee/employee.module').then(res => res.EmployeeModule),
    canActivate: [LoginGuardService]
  },
  {
    path: "start", component: StartComponent, canActivate: [LoginGuardService]
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
