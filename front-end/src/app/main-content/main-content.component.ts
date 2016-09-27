import { Component , OnInit , trigger, state, style, transition, animate} from '@angular/core';
import { SingleLinkData } from "../shared/single-link-data";
import { DataService } from "../shared/data.service";
import { Router } from "@angular/router";

declare var $:any;

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
  animations : [
    trigger('flyIn' , [
      state('in' , style({
        transform: 'translateX(0)',
        opacity: '1.0',
        // zoom: '1',
        // filter: 'alpha(opacity=100)',
      })),
      transition('void => *' , [
        style({transform: 'translateX(-100%)' ,
          // zoom: '0',
          // filter: 'alpha(opacity=0)',
          opacity: '0'}),
        animate('0.3s 100ms ease-out')
      ]),
      transition('* => void' , [
        animate('0.3s 10 ease-out',
        style({transform: 'translateX(100%)' ,
          // zoom: '0',
          // filter: 'alpha(opacity=0)',
          opacity: '0'})),

      ])
    ]),
    trigger('appeared'  , [
      state('in' , style({
        transform: 'rotateX(0deg)'
      })),
      transition('void => *' , [style({
        transform: 'rotateX(180deg)'
      }) ,
        animate('0.2s ease-out')])
    ])
  ]
})

export class MainContentComponent implements OnInit{
  listFilter = '';
  createNew = false;
  edit = '';
  dataGroup: SingleLinkData[] = null;
  fullName: string;
  tooltipOn: boolean = true;

  constructor(private dataService : DataService , private router: Router){}

  ngOnInit(){

    this.dataService.getItems();
    this.dataService.dataEmmit.subscribe(
      (resource)=>{
        this.dataGroup = resource;
      }
    );

    this.dataService.navName.subscribe(
      (name)=> this.fullName = name
    );
  }

  onDelete(dataToDelete : SingleLinkData){
    this.edit = '';
    this.dataService.deleteContent(dataToDelete);
    this.listFilter = '';
  }

  onOpen(index){
      this.listFilter = '';
      this.router.navigate(['group' , index]);
  }

}
