import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fontAwesome } from 'src/const/font-awesome';
import { AuthService } from 'src/services/auth/auth.service';
import { SidebarService } from '../../../shared/sidebar/sidebar.component';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  fontAwesome = fontAwesome
  
  constructor(
    private authSvc: AuthService,
    private sidebarSvc: SidebarService,
    private router: Router
  ) { }

  get isLoggedIn(){
    return this.authSvc.isLoggedIn
  }

  ngOnInit(): void {
    
  }

  openSidebar(){
    this.sidebarSvc.openSideBar()
  }

  logout(){
    this.authSvc.logout()
    this.router.navigate(['/auth/login'])
  }

}
