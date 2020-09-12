import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImportComponent } from './import/import.component';
import { LoginComponent } from './login/login.component';
import { OverviewComponent } from './overview/overview.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: null,
  },
  {
    path: 'import',
    component: ImportComponent,
  },
  {
    path: 'overview',
    component: OverviewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
