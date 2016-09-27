import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CommonModule, LocationStrategy, HashLocationStrategy} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavBarMenuComponent } from "./nav-bar-menu";
import { MainContentComponent } from "./main-content/main-content.component";
import { Routing } from "./app.routes";
import { ListElementComponent } from "./main-content/list-elements/list-element.component";
import { DataService } from "./shared/data.service";
import { EditCreateComponent } from "./main-content/edit-create/edit-create.component";
import { SingleGroupComponent } from "./single-group/single-group.component";
import { EditCreateLinksComponent } from "./single-group/edit-create-links/edit-create-links.component";
import {HttpModule} from "@angular/http";
import {UserAuthComponent} from "./user-auth/user-auth.component";
import {AuthService} from "./shared/auth.service";
import { PopoverModule } from 'ng2-popover';
import {SignUpComponent} from "./user-auth/sign-up/sign-up.component";
import {SignInComponent} from "./user-auth/sign-in/sign-in.component";
import {RouterModule} from "@angular/router";
import {GroupFilterPipe} from "./main-content/filter.pipe";
import {LinkFilterPipe} from "./single-group/linkFilter.pipe";

@NgModule({
  declarations: [
    AppComponent,
    NavBarMenuComponent,
    MainContentComponent,
    ListElementComponent,
    EditCreateComponent,
    SingleGroupComponent,
    EditCreateLinksComponent,
    UserAuthComponent,
    SignUpComponent,
    SignInComponent,
    GroupFilterPipe,
    LinkFilterPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,
    Routing,
    PopoverModule
  ],
  providers: [DataService , AuthService , {provide: LocationStrategy, useClass: HashLocationStrategy}],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
