import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
    this.state = localStorage.getItem("isLoginTrue")
  }
  
  state: any

  login({email, password}){
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        if(email == 'email@email.com' && password == "123123Xx"){
          localStorage.setItem('isLoginTrue', '1')
          this.state='1'
          resolve(true)
        }else{
          reject("Email dan/atau password tidak dikenal")
        }
      },300)
    })
  }

  logout(){
    localStorage.removeItem('isLoginTrue')
    this.state=null
  }

  get isLoggedIn(){
    return this.state
  }
}
