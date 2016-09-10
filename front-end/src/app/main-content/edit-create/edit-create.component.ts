import {Component, EventEmitter, Output, Input, OnInit} from '@angular/core'
import {Router} from "@angular/router";
import {DataService} from "../../shared/data.service";
import {SingleLinkData} from "../../shared/single-link-data";
import {FormGroup, FormControl , Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-create',
  templateUrl: './edit-create.component.html',
  styleUrls: ['./edit-create.component.scss']
})

export class EditCreateComponent implements OnInit{
  @Input() editContent: SingleLinkData;
  @Output() canceled: EventEmitter<any> = new EventEmitter();
  myForm: FormGroup;


  constructor(private router: Router , private dataService: DataService){}

  ngOnInit(){
    let name = '';
    let description = '';
    if(this.editContent){
      name = this.editContent.groupName;
      description = this.editContent.description;
    }
    this.myForm = new FormGroup({
      'name': new FormControl(name , Validators.required),
      'description': new FormControl(description , Validators.required)
    });

  }

  onSubmit(){
    if(this.editContent){
      let newData = new SingleLinkData(this.myForm.controls['name'].value, this.myForm.controls['description'].value);
      this.dataService.onBackUp(this.editContent);
      this.dataService.editContent(this.editContent , newData);
      this.canceled.emit(false);

    }else {
      let newData = new SingleLinkData(this.myForm.controls['name'].value, this.myForm.controls['description'].value);
      this.dataService.createNewGroup(newData);
      this.canceled.emit(false);
    }
  }

  cancel(){
    this.canceled.emit(false);
  }

}
