import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeManageComponent } from './employee-manage/employee-manage.component';

const routes: Routes=[
  {
    path: "", component: EmployeeListComponent
  },
  {
    path: ":id", component: EmployeeDetailComponent
  },
  {
    path: "new", component: EmployeeManageComponent
  },
  {
    path: '**', redirectTo: "", pathMatch: 'full'
  }
]

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule ]
})

export class EmployeeRoutingModule {}
