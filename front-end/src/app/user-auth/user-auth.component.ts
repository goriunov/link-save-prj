import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {User} from "../shared/user";
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']

})

export class UserAuthComponent implements OnInit{
  myForm: FormGroup;
  test: FormGroup;
  sign: boolean = true;
  isLogIn: boolean = false;
  constructor(private authService : AuthService ,private router: Router){}

  ngOnInit(){
    this.isLogIn = false;
    if(localStorage.getItem('token') !== null){
      this.router.navigate(['/dashboard']);
    }else {
      this.isLogIn = true;
      this.test = new FormGroup({
        'email': new FormControl('', Validators.required),
        'password': new FormControl('', Validators.required)
      });

      this.myForm = new FormGroup({
        'firstName': new FormControl('', Validators.required),
        'lastName': new FormControl('', Validators.required),
        'email': new FormControl('', Validators.required),
        'password': new FormControl('', Validators.required)
      });
    }
  }

  onSubmit(){
    let user: User = new User( this.myForm.value.password , this.myForm.value.email , this.myForm.value.firstName ,this.myForm.value.lastName );
    this.authService.signUp(user);
    this.myForm.reset();
  }

  onTest(){
    let user: User = new User( this.test.value.password , this.test.value.email );
    this.authService.signIn(user);
  }

}
