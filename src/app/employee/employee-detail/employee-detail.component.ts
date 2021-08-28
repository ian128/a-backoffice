import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fontAwesome } from 'src/const/font-awesome';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  fontAwesome = fontAwesome
  flags={
    selectedID: null
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { 
    this.flags.selectedID = this.activatedRoute.snapshot.params.id
  }
  
  back(){
    this.location.back()
  }
  ngOnInit(): void {
    
  }

}
