import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavBarMenuComponent } from "./nav-bar-menu";
import { MainContentComponent } from "./main-content/main-content.component";
import { Routing } from "./app.routes";
import { ListElementComponent } from "./main-content/list-elements/list-element.component";
import { DataService } from "./main-content/data.service";
import { EditCreateComponent } from "./main-content/edit-create/edit-create.component";
import { SingleGroupComponent } from "./single-group/single-group.component";
import { EditCreateLinksComponent } from "./single-group/edit-create-links/edit-create-links.component";
import {HttpModule} from "@angular/http";

@NgModule({
  declarations: [
    AppComponent,
    NavBarMenuComponent,
    MainContentComponent,
    ListElementComponent,
    EditCreateComponent,
    SingleGroupComponent,
    EditCreateLinksComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HttpModule,
    Routing
  ],
  providers: [DataService],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
