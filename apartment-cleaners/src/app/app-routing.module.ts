import { NgModule } from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {ChoresComponent} from './chores/chores.component'
import {ChoresDetailsComponent} from './chores/chores-details/chores-details.component'

import {ChoresEditComponent} from './chores/chores-edit/chores-edit.component'

const appRoutes: Routes = [
    {path: '', redirectTo: "/chores", pathMatch:'full'}, 
    {path: 'chores', component:ChoresComponent, children: [
        {path: 'new', component:ChoresEditComponent},
        {path: ':id', component:ChoresDetailsComponent},
        {path: ':id/edit', component:ChoresEditComponent},
    ]},
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}