import {Injectable, EventEmitter} from '@angular/core';
import { SingleLinkData } from "./single-link-data";
import {Http, Headers, URLSearchParams} from "@angular/http";
import 'rxjs/Rx';
import {Router} from "@angular/router";

@Injectable()

export class  DataService {
  navName : EventEmitter<any> = new EventEmitter;
  dataEmmit: EventEmitter<any> = new EventEmitter;
  constructor(private http: Http , private router: Router){}

  dataGroups: SingleLinkData[] = [];

  getItems(){
    let params: URLSearchParams = new URLSearchParams();
    params.set('token' , localStorage.getItem('token'));
    this.http.get('/database/get-data' ,{search: params})
      .map((response) => response.json() , (err)=> err.json())
      .subscribe(
        (response) => {
          if(response.data) {
            this.dataGroups = response.data.links;
          }
          this.dataEmmit.emit(this.dataGroups);
          var fullName = ''+response.data.firstName + ' '+ response.data.lastName;
          this.navName.emit(fullName);
        },
      (err)=>{
        // console.log('Opps Error :((');
        err = err.json();
        if(err.title == 'Wrong token'|| err.title == 'Not authorize'){
          this.navName.emit('');
          localStorage.clear();
          this.router.navigate(['/']);
        }
      }
      );
  }

  getItem(id: number){
    return this.dataGroups[id];
  }

  createNewGroup(newData: SingleLinkData){
    newData.links = [];
    newData.linkName = [];
    this.dataGroups.push(newData);
    var body = JSON.stringify(newData);
    var headers = new Headers({'Content-Type': 'application/json'});
    const token = localStorage.getItem('token') ?'?token='+localStorage.getItem('token') : '';
    this.http.post('/database/save'+token , body ,{headers: headers})
      .map((res) => res.json())
      .subscribe(
      (res)=>{
        this.dataGroups[this.dataGroups.indexOf(newData)]._id = res.link._id;
        // console.log('New group created :))');
      },
      (err)=>{
        this.dataGroups.splice(this.dataGroups.indexOf(newData),1);
        // console.log('Opps Error :((');
        err = err.json();
        if(err.title == 'Wrong token'|| err.title == 'Not authorize'){
          this.navName.emit('');
          localStorage.clear();
          this.router.navigate(['/']);
        }
      }
    )

  }


  createNewLink(oldData:SingleLinkData , newName: string , newLink: string){
    this.dataGroups[this.dataGroups.indexOf(oldData)].links.push(newLink);
    this.dataGroups[this.dataGroups.indexOf(oldData)].linkName.push(newName);
    const body = JSON.stringify(oldData);
    const headers = new Headers({'Content-Type':'application/json'});
    const token = localStorage.getItem('token') ?'?token='+localStorage.getItem('token') : '';
    this.http.post('/database/create-delete-edit-link'+token , body , {headers: headers})
      .subscribe(
        (res) => {},
        (err) => {
          // console.log('Opps Error :((');
          this.dataGroups[this.dataGroups.indexOf(oldData)].links.splice(this.dataGroups[this.dataGroups.indexOf(oldData)].links.indexOf(newLink) , 1);
          this.dataGroups[this.dataGroups.indexOf(oldData)].linkName.splice(this.dataGroups[this.dataGroups.indexOf(oldData)].linkName.indexOf(newName) , 1);
          err = err.json();
          if(err.title == 'Wrong token'|| err.title == 'Not authorize'){
            this.navName.emit('');
            localStorage.clear();
            this.router.navigate(['/']);
          }
        }

      )

  }



  backupDescrpt ='';
  backupGroupName ='';
  onBackUp(oldData: SingleLinkData){
    this.backupDescrpt = oldData.description;
    this.backupGroupName= oldData.groupName;
  }

  editContent(oldData: SingleLinkData , newData: SingleLinkData){
    this.dataGroups[this.dataGroups.indexOf(oldData)].description = newData.description;
    this.dataGroups[this.dataGroups.indexOf(oldData)].groupName = newData.groupName;
    const body = JSON.stringify(this.dataGroups[this.dataGroups.indexOf(oldData)]);
    const headers = new Headers({'Content-Type':'application/json'});
    const token = localStorage.getItem('token') ?'?token='+localStorage.getItem('token') : '';
    return this.http.post('/database/edit'+token , body ,{headers:headers}).subscribe(
      (data)=>{},
      (err)=> {
        // console.log('Opps Error :((');
        this.dataGroups[this.dataGroups.indexOf(oldData)].description = this.backupDescrpt;
        this.dataGroups[this.dataGroups.indexOf(oldData)].groupName = this.backupGroupName;
        err = err.json();

        if(err.title == 'Wrong token' || err.title == 'Not authorize'){
          this.navName.emit('');
          localStorage.clear();
          this.router.navigate(['/']);
        }
      });
  }




  editLink(oldData:SingleLinkData , index: number , newName: string , newLink: string){
    this.dataGroups[this.dataGroups.indexOf(oldData)].linkName[index] = newName;
    this.dataGroups[this.dataGroups.indexOf(oldData)].links[index] = newLink;

    const body = JSON.stringify(this.dataGroups[this.dataGroups.indexOf(this.dataGroups[this.dataGroups.indexOf(oldData)])]);
    const headers = new Headers({'Content-Type':'application/json'});
    const token = localStorage.getItem('token') ?'?token='+localStorage.getItem('token') : '';
    this.http.post('/database/create-delete-edit-link'+token , body , {headers: headers})
      .subscribe(
        (res) => {},
        (err) => {
          // console.log('Opps Error :((');
          this.router.navigate(['/dashboard']);
          err = err.json();
          if(err.title == 'Wrong token'|| err.title == 'Not authorize'){
            this.navName.emit('');
            localStorage.clear();
            this.router.navigate(['/']);
          }
        }

      )
  }



  deleteLink(data: SingleLinkData , linkId: number){
    this.dataGroups[this.dataGroups.indexOf(data)].links.splice(linkId , 1);
    this.dataGroups[this.dataGroups.indexOf(data)].linkName.splice(linkId , 1);

    const body = JSON.stringify(this.dataGroups[this.dataGroups.indexOf(data)]);
    const headers = new Headers({'Content-Type':'application/json'});
    const token = localStorage.getItem('token') ?'?token='+localStorage.getItem('token') : '';
    this.http.post('/database/create-delete-edit-link'+token , body , {headers: headers})
      .subscribe(
        (res) => {},
        (err) => {
          // console.log('Opps Error :((');
          this.router.navigate(['/dashboard']);
          err = err.json();
          if(err.title == 'Wrong token'|| err.title == 'Not authorize'){
            this.navName.emit('');
            localStorage.clear();
            this.router.navigate(['/']);
          }
        }

      )
  }

  deleteContent(data : SingleLinkData){
    let params: URLSearchParams = new URLSearchParams();
    params.set('id' , data._id);
    params.set('token' , localStorage.getItem('token'));
    this.http.delete('/database/delete-content' , {'search':params})
      .subscribe(
        (res) => {
          // console.log('Element deleted :))');
          this.dataGroups.splice(this.dataGroups.indexOf(data) , 1);
        },
        (err)=>{
          // console.log('Opps Error :((');
          err = err.json();
          if(err.title == 'Wrong token'|| err.title == 'Not authorize'){
            this.navName.emit('');
            localStorage.clear();
            this.router.navigate(['/']);
          }
        }
    );

  }
}
