import { Routes, RouterModule } from '@angular/router';

import { CommonsComponent } from './commons.component';
import {CommonsDetailComponent} from "./commons-detail/commons-detail.component";
import {CommonsAddComponent} from "./commons-add/commons-add.component";
import {CommonsEditComponent} from "./commons-edit/commons-edit.component";


const commonsRoutes: Routes = [

    { path: 'commons', component: CommonsComponent, pathMatch: 'full' },
    { path: 'commons/:id', component: CommonsDetailComponent},
    { path: 'commonsAdd', component: CommonsAddComponent},
    { path: 'commonsEdit/:id', component: CommonsEditComponent}
];

export const commonsRouting = RouterModule.forChild(commonsRoutes);
