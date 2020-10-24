import {NgModule} from '@angular/core'
import { Routes, Router, RouterModule } from '@angular/router'
import { AuthGuard } from './auth-guard.service'
import { ErrorComponent } from './error/error.component'
import { HomeComponent } from './home/home.component'
import { PageNotFouncComponent } from './page-not-founc/page-not-founc.component'
import { canDeactivateGuard } from './servers/edit-server/canDeactivateGuard.service'
import { EditServerComponent } from './servers/edit-server/edit-server.component'
import { serverResolver } from './servers/server/server-resolver.service'
import { ServerComponent } from './servers/server/server.component'
import { ServersComponent } from './servers/servers.component'
import { UserComponent } from './users/user/user.component'
import { UsersComponent } from './users/users.component'


const appRoutes: Routes = [
    { path: '', component:HomeComponent },
    { path: 'users', component:UsersComponent, children :[
      { path: ':id/:name', component:UserComponent }
    ] },
    { path: 'servers', 
    //canActivate: [AuthGuard] , 
    canActivateChild: [AuthGuard],
    component:ServersComponent, children: [
      { path: ':id/edit', component:EditServerComponent, canDeactivate: [canDeactivateGuard] } ,
      { path: ':id', component:ServerComponent, resolve: {server: serverResolver}} 
    ] },
    // {path: 'not-found', component: PageNotFouncComponent},
    {path: 'not-found', component: ErrorComponent, data: {message: 'Page not found'}},
    {path: '**', redirectTo: '/not-found'}
  ]
  

@NgModule({
    imports: [
        // RouterModule.forRoot(appRoutes, {useHash: true})
        RouterModule.forRoot(appRoutes, {useHash: true})
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}