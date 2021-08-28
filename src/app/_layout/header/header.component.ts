import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../shared/sidebar/sidebar.component';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private sidebarSvc: SidebarService
  ) { }

  ngOnInit(): void {
    
  }

  openSidebar(){
    this.sidebarSvc.openSideBar()
  }

}
