import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {SingleLinkData} from "../../shared/single-link-data";
import {DataService} from "../../shared/data.service";
import {Http, URLSearchParams} from "@angular/http";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-edit-create-links',
  templateUrl: './edit-create-links.component.html',
  styleUrls: ['./edit-create-links.component.scss']

})

export class EditCreateLinksComponent implements OnInit{
  @Input() singleGroup : SingleLinkData;
  @Input() index : number;
  @Output() canceled: EventEmitter<any> = new EventEmitter();
  subscribe: Subscription;
  myForm : FormGroup;
  linkName: string = 'Link';
  permission: any = false;
  editing = 'Save';
  creating = 'Create';

  constructor(private dataService: DataService , private http: Http){}

  ngOnInit(){
    let link = '';
    if(this.index >= 0) {
      link = this.singleGroup.links[this.index];
      this.linkName = this.singleGroup.linkName[this.index];
    }

    this.myForm = new FormGroup({
      'link': new FormControl(link  , Validators.required),
      'linkName': new FormControl({value : this.linkName, disabled: true})
    });
  }

  onSubmit() {
    this.permission = true;
    let params = new URLSearchParams();
    params.set('link', this.myForm.controls['link'].value);

    this.subscribe = this.http.get('/get-title/', {search: params})
      .map((data) => data.json())
      .subscribe(
        (data) => {
          this.linkName = data.title;
          if (this.index >= 0) {
            var link = this.myForm.controls['link'].value;
            if (!link.match(/^[a-zA-Z]+:\/\//))
            {
              link = 'http://' + link;
              console.log(link);
            }
            this.dataService.editLink(this.singleGroup, this.index, this.linkName, link);
            this.canceled.emit(false);
          } else {
            var link = this.myForm.controls['link'].value;
            if (!link.match(/^[a-zA-Z]+:\/\//))
            {
              link = 'http://' + link;
              console.log(link);
            }
            this.dataService.createNewLink(this.singleGroup, this.linkName, link);
            this.canceled.emit(false);
          }
        },
        (err) => {
          this.permission = false;
          console.log(err);
        });
    setTimeout(()=> {
      this.editing = 'Try again';
      this.creating = 'Try again';
      this.subscribe.unsubscribe();
      this.permission = false;
    }, 10000);

  }

  cancel(){
    this.canceled.emit(false);
  }
}
