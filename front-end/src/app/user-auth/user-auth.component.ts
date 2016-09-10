import {Component, OnInit  , trigger, state, style, transition, animate} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {User} from "../shared/user";
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss'],
  animations: [
    trigger('view', [
      state('inactive', style({
        opacity: '0',
        // transform: 'scale(0)',
        display: 'none'
      })),
      state('active',   style({
        opacity: '1',
        // transform: 'scale(1)'
      })),
      state('open', style({
        height: '420px',
      })),
      state('close', style({
        height: '270px',
      })),
      state('none', style({
        height: '*',
      })),
      transition('inactive => active', animate('200ms ease-in')),
      transition('open <=> close', animate('200ms ease-in')),
      transition('none <=> open', animate('200ms ease-in')),
      transition('none <=> close', animate('200ms ease-in')),
    ])
  ]

})

export class UserAuthComponent implements OnInit{
  signUpA = 'inactive';
  formFrame = 'none';
  signInA ='inactive';
  err : number= 0;
  myForm: FormGroup;
  test: FormGroup;
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
    this.err = 0;
    let user: User = new User( this.myForm.value.password , this.myForm.value.email , this.myForm.value.firstName ,this.myForm.value.lastName );
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

  onTest(){
    this.err = 0;
    let user: User = new User( this.test.value.password , this.test.value.email );
    this.authService.signIn(user);
    this.authService.err.subscribe(
      (data) => this.err = data
    );

  }

  activate(bl: boolean){
    this.err = 0;
      if(bl){
        this.signUpA ='active';
        this.signInA = 'inactive';
        this.formFrame ='open';
      }else{
        this.signUpA ='inactive';
        this.signInA = 'active';
        this.formFrame ='close';
      }
  }


}
