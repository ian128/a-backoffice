import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Groups } from 'src/const/group.option';

@Component({
  selector: 'app-employee-manage',
  templateUrl: './employee-manage.component.html',
  styleUrls: ['./employee-manage.component.scss']
})
export class EmployeeManageComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl(null,{
      validators: [Validators.required],
      updateOn: "blur"
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
      validators: [Validators.required],
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
  
  GroupOption = Groups

  constructor(
    private toast: HotToastService,
    private location: Location
  ) { }

  back(){
    this.location.back()
  }

  ngOnInit(): void {

  }

  submit(){
    if(!this.form.valid){
      this.form.markAllAsTouched()
      this.toast.error("Tidak dapat menyimpan data. Mohon periksa kembali isian form anda")
    }
  }


}
