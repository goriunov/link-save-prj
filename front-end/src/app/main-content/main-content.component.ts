import { Component , OnInit , trigger, state, style, transition, animate} from '@angular/core';
import { SingleLinkData } from "../shared/single-link-data";
import { DataService } from "../shared/data.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
  animations : [
    trigger('flyIn' , [
      state('in' , style({
        transform: 'translateX(0)',
        opacity: '1.0'
      })),
      transition('void => *' , [
        style({transform: 'translateX(-100%)' , opacity: '0'}),
        animate('0.3s 100ms ease-out')
      ]),
      transition('* => void' , [
        animate('0.3s 10 ease-out',
        style({transform: 'translateX(100%)' , opacity: '0'})),

      ])
    ])
  ]
})

export class MainContentComponent implements OnInit{
  createNew = false;
  edit = '';
  dataGroup: SingleLinkData[] = null;

  constructor(private dataService : DataService , private router: Router){}

  ngOnInit(){
    this.dataService.getItems();
    this.dataService.dataEmmit.subscribe(
      (resource)=>{
        this.dataGroup = resource;
      }
    )
  }

  onDelete(dataToDelete : SingleLinkData){
    this.edit = '';
    this.dataService.deleteContent(dataToDelete);
  }

  onOpen(index){
      this.router.navigate(['group' , index]);
  }

}
