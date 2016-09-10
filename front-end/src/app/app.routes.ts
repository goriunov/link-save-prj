import {Routes , RouterModule} from '@angular/router';
import { MainContentComponent } from "./main-content/main-content.component";
import {SingleGroupComponent} from "./single-group/single-group.component";
import {UserAuthComponent} from "./user-auth/user-auth.component";


const appRoutes : Routes = [
  { path: '' , component:UserAuthComponent },
  { path: 'dashboard' , component: MainContentComponent },
  { path: 'group/:id' , component: SingleGroupComponent }
];

export const Routing = RouterModule.forRoot(appRoutes);
