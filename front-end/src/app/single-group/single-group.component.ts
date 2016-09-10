import {Component, OnDestroy, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { Subscription } from "rxjs";
import { SingleLinkData } from "../shared/single-link-data";
import {DataService} from "../shared/data.service";

@Component({
  selector: 'app-single-group',
  templateUrl: './single-group.component.html',
  styleUrls: ['./single-group.component.scss']
})


export class SingleGroupComponent implements OnDestroy , OnInit{
  new = false;
  subscribtion: Subscription;
  paramId: number;
  @Input() singleGroup: SingleLinkData;


  constructor(private route: ActivatedRoute , private dataService : DataService , private router : Router){}

  ngOnInit(){

    this.subscribtion = this.route.params.subscribe(
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
    this.dataService.deleteLink(this.singleGroup , index );
  }


  ngOnDestroy(){
    this.subscribtion.unsubscribe();
  }

}
