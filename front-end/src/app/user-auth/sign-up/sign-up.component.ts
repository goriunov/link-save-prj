import {Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/auth.service";
import {User} from "../../shared/user";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],

})

export class SignUpComponent implements OnInit{
  err : number= 0;
  myForm: FormGroup;
  sign: boolean = true;
  isLogIn: boolean = false;
  constructor(private authService : AuthService ,private router: Router){}

  ngOnInit(){
    this.err = 0;
    this.isLogIn = false;
    if(localStorage.getItem('token') !== null){
      this.router.navigate(['/dashboard']);
    }else {
      this.isLogIn = true;
      this.myForm = new FormGroup({
        'firstName': new FormControl('', [Validators.required , this.onlySpacesValidator]),
        'lastName': new FormControl('', [Validators.required , this.onlySpacesValidator]),
        'email': new FormControl('', [Validators.required , this.onlySpacesValidator]),
        'password': new FormControl('', [Validators.required , this.onlySpacesValidator])
      });
    }
  }

  onSubmit(){
    this.err = 0;
    let user: User = new User( this.myForm.value.password , this.myForm.value.email.toLowerCase() , this.myForm.value.firstName ,this.myForm.value.lastName );
    this.authService.signUp(user);
    this.myForm.reset();
    this.sign = false;
    this.err = 3;
    this.authService.err.subscribe(
      (data) => {
        this.err  = data;
      }
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
