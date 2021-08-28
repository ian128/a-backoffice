import { Component, OnInit } from '@angular/core';
import { EmployeeSample } from 'src/models/employee.sample';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  s = EmployeeSample
  constructor() { }

  ngOnInit(): void {
   
  }

}
