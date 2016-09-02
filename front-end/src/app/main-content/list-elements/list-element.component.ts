import { Component , Input } from '@angular/core';
import { SingleLinkData } from "../../shared/single-link-data";


@Component({
  selector: 'app-list-element',
  templateUrl: 'list-element.component.html',
  styleUrls: ['list-element.component.scss']
})

export class ListElementComponent{
 @Input() singleData : SingleLinkData;

}
