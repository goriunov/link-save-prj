import {Component, OnDestroy, OnInit, Input , trigger, state, style, transition, animate} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { Subscription } from "rxjs";
import { SingleLinkData } from "../shared/single-link-data";
import {DataService} from "../shared/data.service";

@Component({
  selector: 'app-single-group',
  templateUrl: './single-group.component.html',
  styleUrls: ['./single-group.component.scss'],
  animations: [trigger('flyIn' , [
      state('*' , style({
        transform: 'translateY(0)',
        opacity: '1'
      })),
      transition('void => *' , [style({
        transform: 'translateY(100%)',
        opacity: '0'
      }) , animate('0.3s 100ms ease-out')])
  ])]
})


export class SingleGroupComponent implements OnDestroy , OnInit{
  new = false;
  listFilter ='';
  subscription : Subscription;
  paramId: number;
  @Input() singleGroup: SingleLinkData;


  constructor(private route: ActivatedRoute , private dataService : DataService , private router : Router){}

  ngOnInit(){

    this.subscription = this.route.params.subscribe(
      (param) => {
        this.paramId = param['id'];
        this.singleGroup = this.dataService.getItem(this.paramId);
        if(this.singleGroup == null ){
          this.router.navigate(['/dashboard'])
        }
      }
    )
  }

  onDelete(index: number){
      this.listFilter ='';
      // console.log(index);
      this.dataService.deleteLink(this.singleGroup , index );
  }


  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
