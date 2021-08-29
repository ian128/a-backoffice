import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { Groups } from 'src/const/group.option';
import { EmployeeService } from 'src/services/employee/employee.service';
import { FilterToggleService } from 'src/shared/filter/filter.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  options={
    group: Groups
  }

  state={
    page: 1, 
    sort:'', 
    limit: 5,
    search: '',
    group: null,
    startBirthDate: null,
    endBirthDate: null,
  }

  filterForm = new FormGroup({
    group: new FormControl()
  })

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
    count: null,
    currentPage: null,
    limit: "5",
    maxPage: null
  }

  fetchState(){
    let qP = this.activatedRoute.snapshot.queryParams
    this.state.page = qP['page']
    this.state.search = qP['search']
    this.state.sort = qP['sort']
    this.state.limit = qP['limit']
    this.state.group = qP['group']
    this.state.startBirthDate = qP['startBirthDate']
    this.state.endBirthDate = qP['endBirthDate']
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

  resetFilter(){
    this.state.group = null
    this.state.startBirthDate = null
    this.state.endBirthDate = null
  }

  onChangeFilter(){
    let qP = {...this.state}
    if(!qP['sort']) delete qP.sort
    if(!qP['search']) delete qP.search
    if(!qP['group']) delete qP.group
    if(!qP['startBirthDate']) delete qP.startBirthDate
    if(!qP['endBirthDate']) delete qP.endBirthDate
    qP.page = 1
    this.router.navigate([location.pathname],{
      queryParams: qP
    })
  }

  deleteEmployee(){
    let x = confirm("Hapus data employee ini?")
    if(x){

    }else{
      this.toast.info("Hapus data employee dibatalkan")
    }
  }

}
