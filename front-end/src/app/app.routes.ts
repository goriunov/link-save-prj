import {Routes , RouterModule} from '@angular/router';
import { MainContentComponent } from "./main-content/main-content.component";
import { EditCreateComponent } from "./edit-create/edit-create.component";


const appRoutes : Routes = [
  {path: '' , redirectTo: 'dashboard' , pathMatch: 'full' },
  {path: 'dashboard' , component: MainContentComponent},
  {path: 'dashboard/:id' , component: EditCreateComponent}
];

export const Routing = RouterModule.forRoot(appRoutes);
