import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { fontAwesome } from 'src/const/font-awesome';
import { Status } from 'src/const/group.option';
import { EmployeeService } from 'src/services/employee/employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  fontAwesome = fontAwesome
  flags={
    selectedID: null
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private employeeSvc: EmployeeService,
    private toast: HotToastService
  ) { 
    this.flags.selectedID = this.activatedRoute.snapshot.params.id
  }

  data: any = {}
  
  back(){
    this.location.back()
  }

  get statusTranslate(){
    try{
      return Status.find((item) => item.id == this.data.status).name
    }catch(e){
      return ''
    }
  }
  ngOnInit(): void {
    this.employeeSvc.getEmployeeDetail(this.flags.selectedID)
    .then((res)=>{
      console.log(res)
      this.data = res
    })
    .catch(e=>{
      this.toast.error(e)
      setTimeout(()=>{
        this.location.back()
      },2000)
    })
  }

}
