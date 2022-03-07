import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { ListBookComponent } from './home/list-book/list-book.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterBookComponent } from './home/register-book/register-book.component';
import { RegisterComponent } from './home/register/register.component';

const routes: Routes = [
  {
    path: 'signUp',
    component: RegisterComponent,
  },
  {
    path: '',
    component: ListBookComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'listBook',
    component: ListBookComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'addBook',
    component: RegisterBookComponent,
    canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
