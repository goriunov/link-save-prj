import { Injectable } from '@angular/core';
import {SingleLinkData} from "../shared/single-link-data";

@Injectable()

export class  DataService {
  dataGroups: SingleLinkData[] = [
    new SingleLinkData("New data", "Some description", ['one' , 'two'],['one ' , 'two']),
    new SingleLinkData("New data1", "Some description", ['one' , 'two'],['one ' , 'two']),
    new SingleLinkData("New data2", "Some description", ['one' , 'two'],['one ' , 'two'])
  ];

  getItems(){
    return this.dataGroups;
  }

  createNewGroup(newData){
    this.dataGroups.push(newData);
  }

  editContent(oldData , newData){
    this.dataGroups[this.dataGroups.indexOf(oldData)].description = newData.description;
    this.dataGroups[this.dataGroups.indexOf(oldData)].groupName = newData.groupName;
  }

  deleteContent(data : SingleLinkData){
      this.dataGroups.splice(this.dataGroups.indexOf(data) , 1);
  }

}
