import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {HomeComponent} from "./home/home.component";
import {ServicesComponent} from "./services/services.component";
import {ServiceDetailComponent} from "./service-detail/service-detail.component";



import {
  AuthGuardService as AuthGuard
} from './auth/auth-guard.service';



const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"Home",component:HomeComponent},
  {path:"Services",component:ServicesComponent},
  {path:"Services/ServiceDetail/:id",component:ServiceDetailComponent,canActivate: [AuthGuard]},
  {path:"Auth",component:AuthComponent},
  { path: '**', redirectTo: '' },






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
