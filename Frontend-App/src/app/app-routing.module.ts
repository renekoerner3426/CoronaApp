import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecreeWindowComponent } from './decree-window/decree-window.component';
import { LoginWindowComponent } from './login-window/login-window.component';
import { UploadWindowComponent } from './upload-window/upload-window.component';

const routes: Routes = [
  {
    path: '',
    component: DecreeWindowComponent,
    data: null,
  },
  {
    path:'login',
    component: LoginWindowComponent,
    data: null,
  },
  {
    path:'upload',
    component: UploadWindowComponent,
    data: null,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
