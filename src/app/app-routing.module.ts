import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: "login", component: LoginComponent , data: { navbarVisible: false }},
  { path: 'register', component: RegisterComponent, data: { navbarVisible: false } },
  { path: 'reset-password', component: ForgetPasswordComponent, data: { navbarVisible: false } },
  { path: 'notAuthorized', component: NotAuthorizedComponent, data: { navbarVisible: false } },
  { path: 'dashboard', component: DashboardComponent ,canActivate: [AuthGuard]},
  { path: "", redirectTo: "login", pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
