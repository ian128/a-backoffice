import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  constructor(
    private toast: HotToastService,
  ) { }

  ngOnInit(): void {
  }

  deleteEmployee(){
    let x = confirm("Hapus data employee ini?")
    if(x){

    }else{
      this.toast.info("Hapus data employee dibatalkan")
    }
  }

}
