import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'src/services/employee/employee.service';
import { FilterToggleService } from 'src/shared/filter/filter.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, OnDestroy {

  state={
    page: 1, 
    sort:'', 
    limit: 5
  }

  constructor(
    private toast: HotToastService,
    public filterToggleSvc: FilterToggleService,
    private router: Router,
    private employeeSvc: EmployeeService,
    private activatedRoute: ActivatedRoute
  ) { 
    this.urlSubs = this.router.events.subscribe(res=>{
      if(res instanceof NavigationEnd){
        this.fetchState()
        this.APICall()
      }
    })
  }

  private urlSubs: Subscription
  
  data: any = []
  paginationResult: any = {
    count: 100,
    currentPage: "9",
    limit: "5",
    maxPage: null
  }

  fetchState(){
    let qP = this.activatedRoute.snapshot.queryParams
    this.state.page = qP['page']
    this.state.sort = qP['sort']
    this.state.limit = qP['limit']
  }

  APICall(){
    this.employeeSvc.getEmployees(this.state).then(res=>{
      console.log(res)
      this.data = res['data']
      this.paginationResult = res['pagination']
    })
  }
  
  ngOnDestroy(){
    if(this.urlSubs) this.urlSubs.unsubscribe()
  }

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
