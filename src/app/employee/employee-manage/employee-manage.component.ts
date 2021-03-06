import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Groups, Status } from 'src/const/group.option';
import { FormValidators } from 'src/functions/FormValidators';
import { EmployeeService } from 'src/services/employee/employee.service';

@Component({
  selector: 'app-employee-manage',
  templateUrl: './employee-manage.component.html',
  styleUrls: ['./employee-manage.component.scss'],
  providers:[
    DatePipe
  ]
})
export class EmployeeManageComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl(null,{
      validators: [Validators.required],
    }),
    firstName: new FormControl(null,{
      validators: [Validators.required],
    }),
    lastName: new FormControl(null,{
      validators: [Validators.required],
    }),
    email: new FormControl(null,{
      validators: [Validators.required, Validators.email],
    }),
    birthDate: new FormControl(null,{
      validators: [Validators.required],
    }),
    basicSalary: new FormControl(null,{
      validators: [Validators.required, FormValidators.cantBeNegative],
    }),
    status: new FormControl(null,{
      validators: [Validators.required],
    }),
    group: new FormControl(null,{
      validators: [Validators.required],
    }),
    description: new FormControl(null,{
      validators: [Validators.required],
    }),
  })
  
  StatusOption = Status
  GroupOption = Groups
  flags={
    selectedID: null
  }

  today = this.datePipe.transform(new Date(),'YYYY-LL-dd')

  constructor(
    private toast: HotToastService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private employeeSvc: EmployeeService,
    private datePipe: DatePipe
  ) { 
    this.flags.selectedID = this.activatedRoute.snapshot.params.id
  }

  back(){
    this.location.back()
  }

  ngOnInit(): void {
    this.employeeSvc.getEmployeeDetail(this.flags.selectedID)
    .then((res)=>{
      console.log(res)
      this.form.patchValue(res)
    })
    .catch(e=>{
      this.toast.error(e)
      setTimeout(()=>{
        this.location.back()
      },2000)
    })
  }

  submit(){
    if(!this.form.valid){
      this.form.markAllAsTouched()
      this.toast.error("Tidak dapat menyimpan data. Mohon periksa kembali isian form anda")
    }else{
      this.toast.loading("Menyimpan...")
      setTimeout(()=>{
        this.toast.close()
        this.toast.success("Terima kasih. Data anda telah disimpan")
        this.location.back()
      },1000)
    }
  }


}
