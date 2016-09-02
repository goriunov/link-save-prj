import { Component , OnInit } from '@angular/core';
import { SingleLinkData } from "../shared/single-link-data";
import { DataService } from "./data.service";


@Component({
  selector: 'app-main-content',
  templateUrl: 'main-content.component.html',
  styleUrls: ['main-content.component.scss']
})

export class MainContentComponent implements OnInit{
  new = false;
  edit = '';
  dataGroup: SingleLinkData[] = [];

  constructor(private dataService : DataService){}

  ngOnInit(){
    this.dataGroup = this.dataService.getItems();
  }

  onDelete(dataToDelete : SingleLinkData){
    this.edit = '';
    this.dataService.deleteContent(dataToDelete);
  }

}
