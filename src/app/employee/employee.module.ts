import { NgModule } from '@angular/core';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeManageComponent } from './employee-manage/employee-manage.component';
import { SharedModule } from 'src/shared/shared.module';
import { EmployeeRoutingModule } from './employee.routing.module';

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeDetailComponent,
    EmployeeManageComponent
  ],
  imports: [
    EmployeeRoutingModule,
    SharedModule
  ]
})

export class EmployeeModule { }
