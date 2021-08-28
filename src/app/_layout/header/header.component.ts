import { Component, OnInit } from '@angular/core';
import { fontAwesome } from 'src/const/font-awesome';
import { SidebarService } from '../../../shared/sidebar/sidebar.component';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  fontAwesome = fontAwesome
  
  constructor(
    private sidebarSvc: SidebarService
  ) { }

  ngOnInit(): void {
    
  }

  openSidebar(){
    this.sidebarSvc.openSideBar()
  }

}
