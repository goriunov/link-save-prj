import {Routes , RouterModule} from '@angular/router';
import { MainContentComponent } from "./main-content/main-content.component";
import { EditCreateComponent } from "./main-content/edit-create/edit-create.component";
import {SingleGroupComponent} from "./single-group/single-group.component";


const appRoutes : Routes = [
  { path: '' , redirectTo: 'dashboard' , pathMatch: 'full' },
  { path: 'dashboard' , component: MainContentComponent },
  { path: 'group/:id' , component: SingleGroupComponent }
];

export const Routing = RouterModule.forRoot(appRoutes);
