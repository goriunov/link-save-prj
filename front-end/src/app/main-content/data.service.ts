import { Injectable } from '@angular/core';
import {SingleLinkData} from "../shared/single-link-data";

@Injectable()

export class  DataService {
  dataGroups: SingleLinkData[] = [
    new SingleLinkData("New data", "Some description", ['one1' , 'two1']  ,['one2 ' , 'two']),
    new SingleLinkData("New data1", "Some description", ['one2' , 'two2'] ,['one ' , 'two']),
    new SingleLinkData("New data2", "Some description", ['one3' , 'two3'] ,['one ' , 'two'])
  ];

  getItems(){
    return this.dataGroups;
  }

  getItem(id: number){
    return this.dataGroups[id];
  }

  createNewGroup(newData: SingleLinkData){
    this.dataGroups.push(newData);
  }

  createNewLink(oldData:SingleLinkData , newName: string , newLink: string){
    this.dataGroups[this.dataGroups.indexOf(oldData)].links.push(newLink);
    this.dataGroups[this.dataGroups.indexOf(oldData)].linkName.push(newName);
  }

  editContent(oldData: SingleLinkData , newData: SingleLinkData){
    this.dataGroups[this.dataGroups.indexOf(oldData)].description = newData.description;
    this.dataGroups[this.dataGroups.indexOf(oldData)].groupName = newData.groupName;
  }

  editLink(oldData:SingleLinkData , index: number , newName: string , newLink: string){
    this.dataGroups[this.dataGroups.indexOf(oldData)].linkName[index] = newName;
    this.dataGroups[this.dataGroups.indexOf(oldData)].links[index] = newLink;
  }


  deleteLink(data: SingleLinkData , linkId: number){
    this.dataGroups[this.dataGroups.indexOf(data)].links.splice(linkId , 1);
    this.dataGroups[this.dataGroups.indexOf(data)].linkName.splice(linkId , 1);
  }

  deleteContent(data : SingleLinkData){
      this.dataGroups.splice(this.dataGroups.indexOf(data) , 1);
  }



}
