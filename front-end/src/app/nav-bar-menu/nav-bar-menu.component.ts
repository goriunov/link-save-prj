import {Component, OnInit} from '@angular/core';
import {DataService} from "../shared/data.service";
import {Router} from "@angular/router";


@Component({
  selector:'app-left-menu',
  templateUrl:'./nav-bar-menu.component.html',
  styleUrls:['./nav-bar-menu.component.scss']

})

export class NavBarMenuComponent implements OnInit{
  fullName: string = '';
  constructor(private dataSercice : DataService , private router: Router){}

  ngOnInit(){
    this.dataSercice.navName.subscribe(
      (data)=> this.fullName = data
    );
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['/group/1']);
  }



}
