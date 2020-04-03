import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import { MyErrorStateMatcher } from '@class/MyErrosStateMatcher';
import { Router } from '@angular/router';
import { GlobalService } from '@app/services/global/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  formData = {
    login: new FormControl('', [Validators.required, Validators.minLength(2)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  };

  constructor(private globalService: GlobalService,
              public router: Router) {}

  ngOnInit(): void {
    if (this.globalService.authService.isAuthenticated()){
      this.router.navigate([`/hospital`]);
    }
  }

  disableLogin = () => !this.formData.login.valid || !this.formData.password.valid;

  login() {
    this.globalService.setLoading(true);
    this.globalService.authService.login(this.formData.login.value, this.formData.password.value).then( result => {
      this.globalService.setLoading(false);
      if (result && result.getId()){
         this.router.navigate([`/hospital`]);
      }
    }).catch(error => {
      console.log(error);
    });
  }

}
