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
import { EditCreateComponent } from "./edit-create/edit-create.component";

@NgModule({
  declarations: [
    AppComponent,
    NavBarMenuComponent,
    MainContentComponent,
    ListElementComponent,
    EditCreateComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    Routing
  ],
  providers: [DataService],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
