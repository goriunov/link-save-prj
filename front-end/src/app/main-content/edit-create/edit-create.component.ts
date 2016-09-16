import {Component, EventEmitter, Output, Input, OnInit } from '@angular/core'
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
  needDesc: boolean = false;


  constructor(private router: Router , private dataService: DataService){}

  ngOnInit(){
    let name = '';
    let description = '';
    if(this.editContent){
      name = this.editContent.groupName;
      description = this.editContent.description;
    }
    this.myForm = new FormGroup({
      'name': new FormControl(name , [Validators.required , this.onlySpacesValidator]),
      'description': new FormControl(description)
    });

  }

  onSubmit(){
    if(this.editContent){
      var description = this.myForm.controls['description'].value;
      if(/\S/.test(description)){
      }else{
        description = '';
      }

      let newData = new SingleLinkData(this.myForm.controls['name'].value, description);
      this.dataService.onBackUp(this.editContent);
      this.dataService.editContent(this.editContent , newData);
      this.canceled.emit(false);

    }else {

      var description = this.myForm.controls['description'].value;
      if(/\S/.test(description)){
      }else{
        description = '';
      }
      let newData = new SingleLinkData(this.myForm.controls['name'].value, description);
      this.dataService.createNewGroup(newData);
      this.canceled.emit(false);
    }
  }

  cancel(){
    this.canceled.emit(false);
  }


  onlySpacesValidator(control: FormControl) : {[s: string]: boolean}{

    if(/\S/.test(control.value)){
      return null;
    }else{
      return {name: true}
    }

  }

}
