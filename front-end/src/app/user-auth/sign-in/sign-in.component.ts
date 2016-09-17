import {Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/auth.service";
import {User} from "../../shared/user";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']

})

export class SignInComponent implements OnInit{
  err : number= 0;
  test: FormGroup;
  isLogIn: boolean = false;
  constructor(private authService : AuthService ,private router: Router){}

  ngOnInit(){
    this.err = 0;
    this.isLogIn = false;
    if(localStorage.getItem('token') !== null){
      this.router.navigate(['/dashboard']);
    }else {
      this.isLogIn = true;
      this.test = new FormGroup({
        'email': new FormControl('', [Validators.required , this.onlySpacesValidator]),
        'password': new FormControl('', [Validators.required , this.onlySpacesValidator])
      });
    }
  }

  onTest(){
    this.err = 0;
    let user: User = new User( this.test.value.password, this.test.value.email.toLowerCase()  );
    this.authService.signIn(user);
    this.authService.err.subscribe(
      (data) => this.err = data
    );

  }

  onlySpacesValidator(control: FormControl) : {[s: string]: boolean}{
    if(/\S/.test(control.value)){
      return null;
    }else{
      return {name: true}
    }

  }


}
