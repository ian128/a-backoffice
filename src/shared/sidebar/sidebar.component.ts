import { Component, Inject, Injectable, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  constructor(
    private sidebarSvc: SidebarService,
    private router: Router
  ) { }

  private sidebarSubject: Subscription
  private routerSubs: Subscription

  public isSidebarOpened: Boolean
  
  ngOnInit(): void {
    this.routerSubs = this.router.events.subscribe((res)=>{
      if(res instanceof NavigationEnd){
        this.sidebarSvc.closeSideBar()
      }
    })
    this.sidebarSubject = this.sidebarSvc.behaviorSubject.subscribe(res=>{
      this.isSidebarOpened=res
    })
  }

  ngOnDestroy(){
    if(this.sidebarSubject) this.sidebarSubject.unsubscribe()
  }

  close(){
    this.sidebarSvc.closeSideBar()
  }
}

@Injectable({
  providedIn: 'root'
})

export class SidebarService{
  behaviorSubject = new BehaviorSubject(false)

  openSideBar(){
    this.behaviorSubject.next(true)
  }

  closeSideBar(){
    this.behaviorSubject.next(false)
  }
}
