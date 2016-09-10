import {Http, Headers} from "@angular/http";
import {Injectable} from '@angular/core'
import {User} from "./user";
import 'rxjs/Rx';
import {Router} from "@angular/router";
@Injectable()

export class AuthService {
  constructor(private http : Http , private router: Router){}

  signUp(user: User){
    const body = JSON.stringify(user);
    const headers  = new Headers({'Content-Type': 'application/json'});
    this.http.post('/user/' , body , {headers: headers})
      .subscribe(
        (res)=> {},
        (err)=> console.log(err)
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
        (err)=> console.log(err)
      )
  }

  checkAuth(){

  }
}
