import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PrototipoComponent } from './prototipo/prototipo.component';

const routes: Routes = 
[
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path:'prototipo', component: PrototipoComponent},
  {path:'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
