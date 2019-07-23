import { Routes, RouterModule } from '@angular/router';
import {default as config} from '../config/config.json';
import { TokensComponent } from './tokens.component';
import {TokensDetailComponent} from "./tokens-detail/tokens-detail.component";
import {TokensAddComponent} from "./tokens-add/tokens-add.component";
import {TokensEditComponent} from "./tokens-edit/tokens-edit.component";
import {TokensSearchComponent} from "./tokens-search/tokens-search.component";

const tokensRoutes: Routes = [

    { path: config['tokens'].component.nameModule.toLowerCase() , component: TokensComponent, pathMatch: 'full' },
    { path: config['tokens'].component.nameModule.toLowerCase()  + '/:id', component: TokensDetailComponent},
    { path: config['tokens'].component.nameModule.toLowerCase()  + 'add', component: TokensAddComponent},
    { path: config['tokens'].component.nameModule.toLowerCase() + 'edit/:id', component: TokensEditComponent},
	{ path: config['tokens'].component.nameModule.toLowerCase() + 'search', component: TokensSearchComponent}
];

export const tokensRouting = RouterModule.forChild(tokensRoutes);
