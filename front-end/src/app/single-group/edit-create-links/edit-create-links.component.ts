import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {SingleLinkData} from "../../shared/single-link-data";
import {DataService} from "../../main-content/data.service";

@Component({
  selector: 'app-edit-create-links',
  templateUrl: 'edit-create-links.component.html',
  styleUrls: ['edit-create-links.component.scss']
})

export class EditCreateLinksComponent implements OnInit{
  @Input() singleGroup : SingleLinkData;
  @Input() index : number;
  @Output() canceled: EventEmitter<any> = new EventEmitter();
  myForm : FormGroup;

  constructor(private dataService: DataService){}

  ngOnInit(){
    let link = '';
    let linkName = '';
    if(this.index) {
      link = this.singleGroup.links[this.index];
      linkName = this.singleGroup.linkName[this.index];
    }

    this.myForm = new FormGroup({
      'link': new FormControl(link, Validators.required),
      'linkName': new FormControl(linkName, Validators.required)
    });
  }

  onSubmit(){
    if(this.index) {
      this.dataService.editLink(this.singleGroup, this.index, this.myForm.controls['linkName'].value, this.myForm.controls['link'].value);
      this.canceled.emit(false);
    }else{
      this.dataService.createNewLink(this.singleGroup , this.myForm.controls['linkName'].value , this.myForm.controls['link'].value);
      this.canceled.emit(false);
    }
  }

  cancel(){
    this.canceled.emit(false);
  }


}
