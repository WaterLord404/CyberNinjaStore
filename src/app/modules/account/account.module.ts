import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './components/user/user.component';
import { IsLoggedGuard } from 'src/app/core/guards/is-logged.guard';
import { ConfirmAccountComponent } from './components/confirm-account/confirm-account.component';

const routes: Routes = [
  { path: '', component: UserComponent, canActivate: [IsLoggedGuard] },
  { path: 'confirm-account/:token', component: ConfirmAccountComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserComponent,
    ConfirmAccountComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AccountModule { }
