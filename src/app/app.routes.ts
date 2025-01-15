import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { InsuranceDashboardComponent } from './insurance-dashboard/insurance-dashboard.component';
import { CreatePolicyComponent } from './insurance-dashboard/create-policy/create-policy.component';
import { EditPolicyComponent } from './insurance-dashboard/edit-policy/edit-policy.component';
import { ViewPolicyComponent } from './insurance-dashboard/view-policy/view-policy.component';
import { AuthGuard } from './guards/auth.guard';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: InsuranceDashboardComponent, canActivate: [AuthGuard] },
  { path: 'create-policy', component: CreatePolicyComponent , canActivate: [AuthGuard] },
  { path: 'edit-policy/:id', component: EditPolicyComponent , canActivate: [AuthGuard] },
  { path: 'view-policy/:id', component: ViewPolicyComponent , canActivate: [AuthGuard] },
];
