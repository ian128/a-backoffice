import { Injectable } from '@angular/core';
import { EmployeeSample } from 'src/models/employee.sample';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  static data = EmployeeSample
  constructor() { }
  
  getEmployees({page = 1, search, limit = 5,
    group, startBirthDate, endBirthDate}){

    let result = EmployeeService.data
    if(search){
      result = result.filter((item)=>{
        return [item.firstName,item.lastName].join(' ').toLowerCase().includes(search.toLowerCase())
      })
    }
    if(group){
      result = result.filter((item)=>{
        return item.group == group
      })
    }
    if(startBirthDate){
      result = result.filter((item)=>{
        return new Date(startBirthDate).getTime() <= new Date(item.birthDate).getTime()
      })
    }
    if(endBirthDate){
      result = result.filter((item)=>{
        return new Date(item.birthDate).getTime() <= new Date(endBirthDate).getTime()
      })
    }
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

  deleteEmployee(id){
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        resolve(true)
      },300)
    })
  }
  
}