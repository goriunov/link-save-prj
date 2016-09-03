import { Component , OnInit } from '@angular/core';
import { SingleLinkData } from "../shared/single-link-data";
import { DataService } from "./data.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-main-content',
  templateUrl: 'main-content.component.html',
  styleUrls: ['main-content.component.scss']
})

export class MainContentComponent implements OnInit{
  createNew = false;
  edit = '';
  dataGroup: SingleLinkData[] = [];

  constructor(private dataService : DataService , private router: Router){}

  ngOnInit(){
    this.dataGroup = this.dataService.getItems();
  }

  onDelete(dataToDelete : SingleLinkData){
    this.edit = '';
    this.dataService.deleteContent(dataToDelete);
  }

  onOpen(index){
      this.router.navigate(['group' , index]);
  }

}
