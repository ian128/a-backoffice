import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl(null,{
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl(null,{
      validators: [Validators.required]
    }),
  })
  constructor(
    private authSvc: AuthService,
    private toastSvc: HotToastService,
    private router: Router
  ) { }


  proceedLogin(){
    this.authSvc.login(this.form.value)
    .then(res=>{
      this.toastSvc.success("Berhasil login!")
      this.router.navigate(['/start'],{
        replaceUrl: true
      })
    })
    .catch(e=>{
      this.toastSvc.error(e)
    })
  }

  ngOnInit(): void {
  }

}
