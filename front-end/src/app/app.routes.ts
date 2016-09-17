import {Routes , RouterModule} from '@angular/router';
import { MainContentComponent } from "./main-content/main-content.component";
import {SingleGroupComponent} from "./single-group/single-group.component";
import {UserAuthComponent} from "./user-auth/user-auth.component";
import {SignInComponent} from "./user-auth/sign-in/sign-in.component";
import {SignUpComponent} from "./user-auth/sign-up/sign-up.component";


const appRoutes : Routes = [
  { path: '' , redirectTo: '/authorization/sign-up' , pathMatch: 'full' },
  { path: 'authorization' , redirectTo: '/authorization/sign-up' , pathMatch:'full'},
  { path: 'authorization' , component:UserAuthComponent   , children: [
    {path: 'sign-in' , component: SignInComponent},
    {path: 'sign-up' , component: SignUpComponent}
  ]},
  { path: 'dashboard' , component: MainContentComponent },
  { path: 'group/:id' , component: SingleGroupComponent }
];

export const Routing = RouterModule.forRoot(appRoutes);
