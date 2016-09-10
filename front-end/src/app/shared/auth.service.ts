import {Http, Headers} from "@angular/http";
import {Injectable, EventEmitter} from '@angular/core'
import {User} from "./user";
import 'rxjs/Rx';
import {Router} from "@angular/router";
@Injectable()

export class AuthService {
  err: EventEmitter<any>= new EventEmitter();
  constructor(private http : Http , private router: Router){}

  signUp(user: User){
    const body = JSON.stringify(user);
    const headers  = new Headers({'Content-Type': 'application/json'});
    this.http.post('/user/' , body , {headers: headers})
      .subscribe(
        (res)=> {
          this.err.emit(3);
        },
        (err)=> {
          console.log(err);
          this.err.emit(4);
        }
      )
  }

  signIn(user: User){
    const body = JSON.stringify(user);
    const headers  = new Headers({'Content-Type': 'application/json'});

    this.http.post('/user/sing-in' , body , {headers: headers})
      .map((res)=> res.json())
      .subscribe(
        (res)=> {
          localStorage.setItem('token' , res.token);
          localStorage.setItem('id' , res.id);
          this.router.navigate(['/dashboard']);
        },
        (err)=> {
          err = err.json();
          if(err.title == 'Not such a user' || err.title == 'Wrong password') {
            this.err.emit(1);
          }
          if(err.title == 'Not verified') {
            this.err.emit(2);
          }
        }
      )
  }

}
