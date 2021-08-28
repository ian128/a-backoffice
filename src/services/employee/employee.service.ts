import { Injectable } from '@angular/core';
import { EmployeeSample } from 'src/models/employee.sample';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  static data = EmployeeSample
  constructor() { }
  
  getEmployees({page = 1, sort, limit = 5}){

    let result = EmployeeService.data
    let paginatedResult =  result.slice((page-1)*limit, (page)*limit)
    
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        resolve({
          pagination:{
            currentPage: page,
            limit: limit,
            count: result.length,
            maxPage: Math.ceil(result.length / limit)
          },
          data: paginatedResult
        })
      },300)
    })
  }

  getEmployeeDetail(id){
    let d = EmployeeService.data

    console.log(id)
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        let result = d.find(item => item.id.toString() == id.toString())
        if(result) resolve(result)
        else reject("Employee tidak ditemukan")
      },300)
    })

  }
  
}