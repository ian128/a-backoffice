import { Component, Injectable, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  constructor(
    private filterSvc: FilterToggleService,
    private router: Router
  ) { }

  private sidebarSubject: Subscription
  private routerSubs: Subscription

  public isFilterOpened: Boolean
  
  ngOnInit(): void {
    this.routerSubs = this.router.events.subscribe((res)=>{
      if(res instanceof NavigationEnd){
        this.filterSvc.closeFilter()
      }
    })
    this.sidebarSubject = this.filterSvc.behaviorSubject.subscribe(res=>{
      this.isFilterOpened=res
    })
  }

  ngOnDestroy(){
    if(this.routerSubs) this.routerSubs.unsubscribe()
    if(this.sidebarSubject) this.sidebarSubject.unsubscribe()
  }

  close(){
    this.filterSvc.closeFilter()
  }

}

@Injectable({
  providedIn: 'root'
})

export class FilterToggleService{
  behaviorSubject = new BehaviorSubject(false)

  openFilter(){
    this.behaviorSubject.next(true)
  }

  closeFilter(){
    this.behaviorSubject.next(false)
  }
}
